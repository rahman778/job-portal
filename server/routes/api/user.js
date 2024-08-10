const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const Recruiter = require("../../models/recruiter");
const Candidate = require("../../models/candidate");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const upload = require("../../utils/storage");
const { ROLES } = require("../../constants");

// search users api
router.get("/search", auth, role.check(ROLES.Admin), async (req, res) => {
   try {
      const { search } = req.query;

      const regex = new RegExp(search, "i");

      const users = await User.find(
         {
            $or: [
               { firstName: { $regex: regex } },
               { lastName: { $regex: regex } },
               { email: { $regex: regex } },
            ],
         },
         { password: 0, _id: 0 }
      ).populate("recruiter", "companyName");

      res.status(200).json({
         users,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// fetch users api
router.get("/list", auth, role.check(ROLES.Admin), async (req, res) => {
   try {
      const { page = 1, limit = 10, type = "candidate" } = req.query;

      const role = type === "candidate" ? ROLES.Candidate : ROLES.Recruiter;

      let users;

      if (type === "candidate") {
         users = await Candidate.find()
            .sort("-created")
            .populate("user", "-password")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
      } else {
         users = await Recruiter.find()
            .sort("-created")
            .populate("user", "-password")
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
      }

      const count = await User.countDocuments({ role });

      res.status(200).json({
         users,
         totalPages: Math.ceil(count / limit),
         currentPage: Number(page),
         count,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// fetch user profile
router.get("/me", auth, async (req, res) => {
   try {
      const user = req.user._id;
      let userDoc;
      if (req.user.role === ROLES.Candidate) {
         userDoc = await Candidate.findOne({ user }).populate({
            path: "user",
            model: "User",
            select: "-password -accountConfirmToken",
         });
      } else if (req.user.role === ROLES.Recruiter) {
         userDoc = await Recruiter.findOne({ user }).populate({
            path: "user",
            model: "User",
            select: "-password -accountConfirmToken",
         });
      } else {
         const response = await User.findById(user, { password: 0 });

         userDoc = { user:response };

      }

      res.status(200).json({
         user: userDoc,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

// update user
router.put("/", auth, async (req, res) => {
   try {
      const userId = req.user._id;
      const newUserData = req.body;
      const query = { _id: userId };

      const userDoc = await User.findOneAndUpdate(query, newUserData, {
         new: true,
      });

      if(req.body.companyName) {
         await Recruiter.findOneAndUpdate({ query, companyName:req.body.companyName })
      }

      if(req.body.description) {
         await Recruiter.findOneAndUpdate({ query, description:req.body.description })
      }

      res.status(200).json({
         success: true,
         message: "Your profile is successfully updated!",
         user: userDoc,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

// update user profile
router.put(
   "/profile",
   auth,
   upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "logo", maxCount: 1 },
      { name: "resume", maxCount: 1 },
   ]),
   async (req, res) => {
      try {
         const userId = req.user._id;
         const newUserData = req.body.profile ?? {};
         const query = { user: userId };

         if (req.user.role === ROLES.Candidate) {
            if (req.files["avatar"]) {
               newUserData.avatar = req.files["avatar"][0].location;
            }

            if (req.files["resume"]) {
               newUserData.resume = req.files["resume"][0].location;
            }

            const candidateDoc = await Candidate.findOneAndUpdate(
               query,
               { ...newUserData, updated: Date.now() },
               {
                  new: true,
               }
            );

            res.status(200).json({
               success: true,
               message: "Your profile is successfully updated!",
               user: candidateDoc,
            });
         } else {
            // Role not specified(Recruiter or Admin)
            if (req.files["logo"]) {
               newUserData.logo = req.files["logo"][0].location;
            }

            const recruiterDoc = await Recruiter.findOneAndUpdate(
               query,
               { ...newUserData, updated: Date.now() },
               {
                  new: true,
               }
            );

            res.status(200).json({
               success: true,
               message: "Recruiter profile is successfully updated!",
               user: recruiterDoc,
            });
         }
      } catch (error) {
         console.log('error :>> ', error);
         res.status(400).json({
            error,
         });
      }
   }
);

module.exports = router;
