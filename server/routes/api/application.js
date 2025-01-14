const express = require("express");
const router = express.Router();

const Application = require("../../models/application");
const Candidate = require("../../models/candidate");
const Job = require("../../models/job");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const mailer = require("../../services/nodemailer");

const upload = require("../../utils/storage");

const { ROLES } = require("../../constants");

// fetch job specific applications api
router.get("/job/:jobId", auth, async (req, res) => {
   try {
      const job = req.params.jobId;

      const application = await Application.find({ job })
         .sort("-created")
         .populate({
            path: "applicant",
            model: "Candidate",
            select: "resume",
            populate: {
               path: "user",
               model: "User",
               select: "firstName lastName",
            },
         });

      res.status(200).json({
         data: application,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

// fetch candidate applications api
router.get("/applied", auth, role.check(ROLES.Candidate), async (req, res) => {
   try {
      const user = req.user._id;

      const candidateDoc = await Candidate.findOne({ user });
      const candidate = candidateDoc._id;

      const application = await Application.find({ applicant: candidate })
         .select("status applicationDate")
         .sort("-created")
         .populate({
            path: "job",
            model: "Job",
            select: "title ",
            populate: {
               path: "user",
               model: "Recruiter",
               select: "companyName logo",
            },
         });

      res.status(200).json({
         data: application,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

//add new application
router.post(
   "/add/:jobId",
   auth,
   role.check(ROLES.Candidate),
   upload.single("resume"),
   async (req, res) => {
      try {
         const { coverLetter, resumeLink } = req.body;

         const jobId = req.params.jobId;

         const candidateDoc = await Candidate.findOne({ user: req.user._id }).populate({
            path: "user",
            model: "User",
            select: "-password -accountConfirmToken",
         });

         let resume = req.file ? req.file.location : resumeLink;

         const application = new Application({
            job: jobId,
            applicant: candidateDoc._id,
            resume,
            coverLetter,
         });

         const savedApplication = await application.save();

         const jobData = await Job.findOne({ _id: savedApplication.job }).populate({
            path: "user",
            model: "Recruiter",
            select: "companyName",
         });

         // Increment the activeApplications count
         await Job.findByIdAndUpdate(jobId, { $inc: { activeApplications: 1 } });

         const emailData = {
            firstName: candidateDoc.user.firstName,
            lastName: candidateDoc.user.lastName,
            jobTitle: jobData.title,
            company: jobData.user.companyName,
            type: 'Screening',
         };
   
         const emailRes = await mailer.sendEmail(
            candidateDoc.user.email,
            "application-status",
            req.headers.origin,
            emailData
         );

         res.status(200).json({
            success: true,
            message: `Application has been submitted successfully!`,
            data: savedApplication,
         });
      } catch (error) {
         res.status(400).json({
            error,
         });
      }
   }
);

//update application status
router.put("/:applicationId", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      const status = req.body.status;
      const applicationId = req.params.applicationId;
      const query = { _id: applicationId };

      const application = await Application.findOneAndUpdate(
         query,
         { status, updated: Date.now() },
         {
            new: true,
         }
      );

      const candidateDoc = await Candidate.findOne({ _id: application.applicant }).populate({
         path: "user",
         model: "User",
         select: "-password -accountConfirmToken",
      });

      const jobData = await Job.findOne({ _id: application.job }).populate({
         path: "user",
         model: "Recruiter",
         select: "companyName",
      });

      const emailData = {
         firstName: candidateDoc.user.firstName,
         lastName: candidateDoc.user.lastName,
         jobTitle: jobData.title,
         company: jobData.user.companyName,
         type: status,
      };

      const emailRes = await mailer.sendEmail(
         candidateDoc.user.email,
         "application-status",
         req.headers.origin,
         emailData
      );

      res.status(200).json({
         success: true,
         message: "Status has been updated successfully!",
         data: application,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
