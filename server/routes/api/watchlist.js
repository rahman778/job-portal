const express = require("express");
const router = express.Router();

const Watchlist = require("../../models/watchlist");
const Candidate = require("../../models/candidate");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const { ROLES } = require("../../constants");

router.post("/add", auth, role.check(ROLES.Candidate), async (req, res) => {
   try {
      const { job, isLiked } = req.body;

      const user = req.user._id;

      const candidateDoc = await Candidate.findOne({ user });

      const update = {
         job,
         isLiked,
         updated: Date.now(),
      };
      const query = { job, user: candidateDoc._id };

      const updatedWatchlist = await Watchlist.findOneAndUpdate(query, update, {
         new: true,
      });

      if (updatedWatchlist !== null) {
         res.status(200).json({
            success: true,
            message: "Your Watchlist has been updated successfully!",
            watchlist: updatedWatchlist,
         });
      } else {
         const watchlist = new Watchlist({
            job,
            isLiked,
            user: candidateDoc._id,
         });

         const watchlistDoc = await watchlist.save();

         res.status(200).json({
            success: true,
            message: `Added to your Watchlist successfully!`,
            watchlist: watchlistDoc,
         });
      }
   } catch (e) {
      return res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// fetch watchlist api
router.get("/", auth, async (req, res) => {
   try {
      const user = req.user._id;

      const candidateDoc = await Candidate.findOne({ user });

      const watchlist = await Watchlist.find({ user: candidateDoc._id, isLiked: true })
         .populate({
            path: "job",
            select: "title description",
         })
         .sort("-updated");

      res.status(200).json({
         watchlist,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
