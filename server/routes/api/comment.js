const express = require("express");
const router = express.Router();

const Comment = require("../../models/comment");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const { ROLES } = require("../../constants");

// fetch application specific comments api
router.get("/application/:applicationId", async (req, res) => {
   const application = req.params.applicationId;

   try {
      const comments = await Comment.find({ application }).sort("-created");
      res.status(200).json({
         data: comments,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

//add new comment
router.post("/add", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      const { comment, applicationId } = req.body;

      const newComment = new Comment({
         user: req.user._id,
         application: applicationId,
         comment,
      });

      const savedComment = await newComment.save();

      res.status(200).json({
         success: true,
         message: `Comment has been added successfully!`,
         comment: savedComment,
      });
   } catch (error) {
      res.status(400).json({
         error,
      });
   }
});

//update comment
router.put("/:id", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      const commentId = req.params.id;
      const update = req.body.comment;
      const query = { _id: commentId };

      const updatedComment = await Comment.findOneAndUpdate(
         query,
         { comment: update, updated: Date.now() },
         {
            new: true,
         }
      );

      res.status(200).json({
         success: true,
         message: "Comment has been updated successfully!",
         data: updatedComment,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

//delete comment
router.delete("/delete/:id", auth, role.check(ROLES.Admin, ROLES.Recruiter), async (req, res) => {
   try {
      await Comment.deleteOne({ _id: req.params.id });

      res.status(200).json({
         success: true,
         message: `Comment has been deleted successfully!`,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
