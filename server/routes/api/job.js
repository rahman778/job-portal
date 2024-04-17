const express = require("express");
const router = express.Router();

const Job = require("../../models/job");
const Recruiter = require("../../models/recruiter");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const { ROLES } = require("../../constants");

// fetch jobs api
router.get("/list", async (req, res) => {
   try {
      const {
         max_salary,
         min_salary,
         salary_currency = 'LKR',
         job_type,
         modality,
         search,
         page = 1,
         limit = 10,
      } = req.query;

      let filterQuery = {};

      if (search) {
         const searchRegex = new RegExp(search, "i");
         filterQuery.$or = [{ title: searchRegex }, { skillsets: { $in: [searchRegex] } }];
      }

      if (min_salary) {
         filterQuery.minSalary = { $gte: parseInt(min_salary) };
         filterQuery.salaryCurrency = salary_currency;
      }

      if (max_salary) {
         filterQuery.maxSalary = { $lte: parseInt(max_salary) };
         filterQuery.salaryCurrency = salary_currency;
      }

      if (job_type) {
         filterQuery.jobType = job_type;
      }

      if (modality) {
         filterQuery.modality = modality;
      }

      const jobs = await Job.find(filterQuery)
         .sort("-created")
         .populate({
            path: "user",
            model: "Recruiter",
         })
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec();

      const count = jobs.length;

      res.status(200).json({
         data: jobs,
         totalPages: Math.ceil(count / limit),
         currentPage: Number(page),
         count,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

//add new jobs
router.post("/add", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      const {
         title,
         description,
         maxApplicants,
         activeApplications,
         acceptedCandidates,
         dateOfPosting,
         deadline,
         skillsets,
         jobType,
         modality,
         location,
         minSalary,
         maxSalary,
         salaryCurrency,
         recruiterId,
      } = req.body;

      let recruiter;

      if (role.check(ROLES.Recruiter)) {
         const reqDoc = await Recruiter.findOne({ user: req.user._id });
         recruiter = reqDoc._id;
      } else if (role.check(ROLES.Admin)) {
         recruiter = recruiterId;
      }

      const job = new Job({
         user: recruiter,
         title,
         description,
         maxApplicants,
         activeApplications,
         acceptedCandidates,
         dateOfPosting,
         deadline,
         skillsets,
         jobType,
         modality,
         location,
         minSalary,
         maxSalary,
         salaryCurrency,
      });

      const savedJob = await job.save();

      res.status(200).json({
         success: true,
         message: `Job has been added successfully!`,
         product: savedJob,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

//update job
router.put(
   '/:id',
   auth,
   role.check(ROLES.Admin, ROLES.Recruiter),
   async (req, res) => {
     try {
       const jobId = req.params.id;
       const update = req.body.job;
       const query = { _id: jobId };
 
       await Job.findOneAndUpdate(query, update, {
         new: true
       });
 
       res.status(200).json({
         success: true,
         message: 'Job has been updated successfully!'
       });
     } catch (error) {
       res.status(400).json({
         error: 'Your request could not be processed. Please try again.'
       });
     }
   }
 );

 //delete job
 router.delete(
   '/delete/:id',
   auth,
   role.check(ROLES.Admin, ROLES.Recruiter),
   async (req, res) => {
     try {
        await Job.findOneAndUpdate({ _id: req.params.id },{ isRemoved: true });
 
       res.status(200).json({
         success: true,
         message: `Job has been deleted successfully!`,
       });
     } catch (error) {
       res.status(400).json({
         error: 'Your request could not be processed. Please try again.'
       });
     }
   }
 );

module.exports = router;
