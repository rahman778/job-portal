const express = require("express");
const router = express.Router();

const Application = require("../../models/application");
const Candidate = require("../../models/candidate");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

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

         const candidateDoc = await Candidate.findOne({ user: req.user._id });

         let resume = req.file ? req.file.location : resumeLink;

         const application = new Application({
            job: jobId,
            applicant: candidateDoc._id,
            resume,
            coverLetter,
         });

         const savedApplication = await application.save();

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
      const status = req.query.status;
      const applicationId = req.params.applicationId;
      const query = { _id: applicationId };

      const application = await Application.findOneAndUpdate(
         query,
         { status, updated: Date.now() },
         {
            new: true,
         }
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
