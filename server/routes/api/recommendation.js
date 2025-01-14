const express = require("express");
const router = express.Router();

const Candidate = require("../../models/candidate");
const Job = require("../../models/job");

const auth = require("../../middleware/auth");

const { getJobsMatchingQuery, getCandidateMatchingQuery } = require("../../utils/queries");

router.get("/jobs", auth, async (req, res) => {
   try {
      const user = req.user._id;

      const candidateDoc = await Candidate.findOne({ user });

      const basicQuery = getJobsMatchingQuery(candidateDoc);

      // Find jobs matching candidate skills or searched terms
      const matchingJobs = await Job.aggregate(basicQuery);

      res.status(200).json({ candidateDoc, bestJobMatch: matchingJobs });
   } catch (error) {
      res.status(400).json({ error: "Your request could not be processed. Please try again." });
   }
});

router.get("/candidates/:jobId", auth, async (req, res) => {
   try {
      const jobId = req.params.jobId;

      const jobDoc = await Job.findById(jobId);

      const basicQuery = getCandidateMatchingQuery(jobDoc);

      // Find jobs matching candidate skills or searched terms
      const matchingCandidates = await Candidate.aggregate(basicQuery);

      res.status(200).json({ jobDoc, bestCandidateMatch: matchingCandidates });
   } catch (error) {
      res.status(400).json({ error: "Your request could not be processed. Please try again." });
   }
});

module.exports = router;
