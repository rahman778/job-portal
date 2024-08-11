const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

const Job = require("../../models/job");
const Recruiter = require("../../models/recruiter");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const { ROLES } = require("../../constants");

// fetch jobs api
router.get("/list", async (req, res) => {
   try {
      const {
         sort,
         max_salary,
         min_salary,
         category,
         salary_currency = "LKR",
         job_type,
         modality,
         query,
         experience_level,
         date_posted,
         page = 1,
         limit = 20,
         startDate,
         endDate,
         location
      } = req.query;

      let filterQuery = {
         isActive: true,
         isRemoved: false,
      };

      let sortOrder = {};

      if (sort === "salary") {
         sortOrder = {
            "salary.maxSalary": -1,
         };
      } else {
         sortOrder = {
            created: -1,
         };
      }

      if (query) {
         const queryRegex = new RegExp(query, "i");
         filterQuery.$or = [{ title: queryRegex }, { skillsets: { $in: [queryRegex] } }];
      }

      if(location) {
         const firstWord = location.split(' ')[0];
         const locationRegex = new RegExp(firstWord, "i");         
         filterQuery["location"] = { $regex: locationRegex };
      }

      if (min_salary) {
         filterQuery["salary.minSalary"] = { $gte: parseInt(min_salary) };
         filterQuery["salary.currency"] = salary_currency;
      }

      if (max_salary) {
         filterQuery["salary.maxSalary"] = { $lte: parseInt(max_salary) };
         filterQuery["salary.currency"] = salary_currency;
      }

      if (category) {
         let catId = new ObjectId(category);
         filterQuery.category = catId;
      }

      if (job_type) {
         const jobTypes = job_type.split(",");
         filterQuery.jobType = { $in: jobTypes };
      }

      if (modality) {
         const moadalityTypes = modality.split(",");
         filterQuery.modality = { $in: moadalityTypes };
      }

      if (experience_level) {
         const experienceTypes = experience_level.split(",");
         filterQuery.experienceLevel = { $in: experienceTypes };
      }

      if (date_posted && date_posted !== "anytime") {
         filterQuery.created = { $gte: new Date(Date.now() - date_posted * 24 * 60 * 60 * 1000) };
      }

      if (startDate) {
         const start = new Date(startDate);
         start.setHours(0, 0, 0, 0); 
      
         if (endDate) {
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999); 
      
            filterQuery.created = { $gte: start, $lte: end };
         } else {
            filterQuery.created = { $gte: start };
         }
      } else if (endDate) {
         const end = new Date(endDate);
         end.setHours(23, 59, 59, 999); 
         filterQuery.created = { $lte: end };
      }

      const pipeline = [
         { $match: filterQuery },
         {
            $lookup: {
               from: "recruiters",
               localField: "user",
               foreignField: "_id",
               as: "company",
            },
         },
         { $unwind: "$company" },
         {
            $project: {
               company: {
                  user: 0,
                  isActive: 0,
                  status: 0,
               },
               description: 0,
               isActive: 0,
               isRemoved: 0,
               acceptedCandidates: 0,
            },
         },
      ];

      // const jobs = await Job.find(filterQuery)
      //    .sort("-created")
      //    .populate({
      //       path: "user",
      //       model: "Recruiter",
      //    })
      //    .limit(limit * 1)
      //    .skip((page - 1) * limit)
      //    .exec();

      const jobs = await Job.aggregate(pipeline);

      const count = jobs.length;
      const size = count > limit ? page - 1 : 0;
      const currentPage = count > limit ? Number(page) : 1;

      // paginate query
      const paginateQuery = [{ $sort: sortOrder }, { $skip: size * limit }, { $limit: limit * 1 }];

      const results = await Job.aggregate(pipeline.concat(paginateQuery));

      res.status(200).json({
         data: results,
         meta: {
            totalPages: Math.ceil(count / limit),
            currentPage,
            count,
         },
      });
   } catch (error) {
      console.log("error", error);
      res.status(400).json({
         error,
      });
   }
});

router.get("/detail/:jobId", async (req, res) => {
   try {
      const jobId = req.params.jobId;

      const job = await Job.findOne({ _id: jobId })
         .populate({
            path: "user",
            model: "Recruiter",
            select: "companyName logo",
         })
         .populate({
            path: "category",
            model: "Category",
            select: "name",
         });

      res.status(200).json({
         data: job,
      });
   } catch (error) {
      console.log("error", error);
      res.status(400).json({
         error,
      });
   }
});

// fetch company jobs api
router.get("/list/company", auth, async (req, res) => {
   try {
      const user = req.user._id;

      const recruiterDoc = await Recruiter.findOne({ user });

      const jobs = await Job.find({ user: recruiterDoc._id, isRemoved: false })
         .select("title activeApplications isActive isRemoved deadline created")
         .sort("-created");

      res.status(200).json({
         jobs,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

//fetch job stats
router.get("/stats", async (req, res) => {
   const filterQuery = {};

   const { query, category } = req.query;

   if (query) {
      const queryRegex = new RegExp(query, "i");
      filterQuery.$or = [{ title: queryRegex }, { skillsets: { $in: [queryRegex] } }];
   }

   if (category) {
      let catId = new ObjectId(category);
      filterQuery.category = catId;
   }

   try {
      const [jobTypes, modality, experienceLevel] = await Promise.all([
         Job.aggregate([
            { $match: { isActive: true, isRemoved: false, ...filterQuery } },
            {
               $group: {
                  _id: "$jobType",
                  count: { $sum: 1 },
               },
            },
            {
               $project: {
                  label: "$_id",
                  count: 1,
                  _id: 0,
               },
            },
         ]),
         Job.aggregate([
            { $match: { isActive: true, isRemoved: false, ...filterQuery } },
            {
               $group: {
                  _id: "$modality",
                  count: { $sum: 1 },
               },
            },
            {
               $project: {
                  label: "$_id",
                  count: 1,
                  _id: 0,
               },
            },
         ]),
         Job.aggregate([
            { $match: { isActive: true, isRemoved: false, ...filterQuery } },
            {
               $group: {
                  _id: "$experienceLevel",
                  count: { $sum: 1 },
               },
            },
            {
               $project: {
                  label: "$_id",
                  count: 1,
                  _id: 0,
               },
            },
         ]),
      ]);

      res.status(200).json({
         data: { jobTypes, modality, experienceLevel },
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

//company-report
router.get("/company-report", async (req, res) => {
   try {
      const report = await Recruiter.aggregate([
         {
             $lookup: {
                 from: "jobs",
                 localField: "_id",
                 foreignField: "user",
                 as: "jobs",
                 pipeline: [
                     { $match: { isActive: true, isRemoved: false } },
                     {
                         $lookup: {
                             from: "applications",
                             localField: "_id",
                             foreignField: "job",
                             as: "applications",
                         },
                     },
                 ],
             },
         },
         {
             $lookup: {
                 from: "users",
                 localField: "user",
                 foreignField: "_id",
                 as: "user",
             },
         },
         { $unwind: "$user" },
         {
             $addFields: {
                 applicationsReceived: {
                     $sum: {
                         $map: {
                             input: "$jobs",
                             as: "job",
                             in: { $size: "$$job.applications" },
                         },
                     },
                 },
             },
         },
         {
             $project: {
                 companyName: 1,
                 email: "$user.email",
                 logo: 1,
                 jobsPosted: { $size: "$jobs" },
                 applicationsReceived: 1,
             },
         },
     ]);

      res.status(200).json({
         success: true,
         report,
      });
   } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({
         success: false,
         message: "Error generating report",
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
         deadline,
         skillsets,
         jobType,
         modality,
         experienceLevel,
         location,
         salary,
         recruiterId,
         category,
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
         deadline,
         skillsets,
         jobType,
         modality,
         experienceLevel,
         location,
         salary,
         category,
      });

      const savedJob = await job.save();

      res.status(201).json({
         success: true,
         message: `Job has been added successfully!`,
         product: savedJob,
      });
   } catch (error) {
      res.status(400).json({
         message: error,
      });
   }
});

//update job
router.put("/:id", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      const jobId = req.params.id;
      const update = req.body;
      const query = { _id: jobId };

      await Job.findOneAndUpdate(
         query,
         { ...update, updated: Date.now() },
         {
            new: true,
         }
      );

      res.status(200).json({
         success: true,
         message: "Job has been updated successfully!",
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

//delete job
router.delete("/delete/:id", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      await Job.findOneAndUpdate({ _id: req.params.id }, { isRemoved: true, updated: Date.now() });

      res.status(200).json({
         success: true,
         message: `Job has been deleted successfully!`,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
