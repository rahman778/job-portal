const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const Recruiter = require("../../models/recruiter");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");
const uploadImage = require("../../utils/storage");
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

      const users = await User.find({ role }, { password: 0, _id: 0, googleId: 0 })
         .sort("-created")
         .populate("recruiter", "companyName")
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec();

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
      const userDoc = await User.findById(user, { password: 0 }).populate({
         path: "recruiter",
         model: "Recruiter",
      });

      res.status(200).json({
         user: userDoc,
      });
   } catch (error) {
      console.log(error);
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// update user profile
router.put(
   "/",
   auth,
   uploadImage.fields([
      { name: "avatar", maxCount: 1 },
      { name: "logo", maxCount: 1 },
      { name: "resume", maxCount: 1 },
   ]),
   async (req, res) => {
      try {
         const userId = req.user._id;
         const newUserData = req.body.profile;
         const query = { _id: userId };

         if (req.files["avatar"][0]) {
            newUserData.avatar = req.files["avatar"][0].location;
         }

         if (req.files["resume"][0]) {
            newUserData.resume = req.files["resume"][0].location;
         }

         const userDoc = await User.findOneAndUpdate(query, newUserData, {
            new: true,
         });

         if (req.user.role === ROLES.Recruiter || req.user.role === ROLES.Admin) {
            if (req.files["logo"][0]) {
               newUserData.logo = req.files["logo"][0].location;
            }
            await Recruiter.findOneAndUpdate({ _id: userDoc.recruiter }, newUserData, {
               new: true,
            });
         }

         res.status(200).json({
            success: true,
            message: "Your profile is successfully updated!",
            user: userDoc,
         });

         //TODO: Update from admin
      } catch (error) {
         console.log(error);
         res.status(400).json({
            error: "Your request could not be processed. Please try again.",
         });
      }
   }
);

module.exports = router;
