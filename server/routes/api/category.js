const express = require("express");
const router = express.Router();

const Category = require("../../models/category");
const Job = require("../../models/job");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const { ROLES } = require("../../constants");

//add category api
router.post("/add", auth, role.check(ROLES.Admin), async (req, res) => {
   try {
      const { name } = req.body;

      const newCategory = new Category({
         name,
      });

      const savedCategory = await newCategory.save();

      res.status(200).json({
         success: true,
         message: `Category has been added successfully!`,
         category: savedCategory,
      });
   } catch (e) {
      return res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// list active category api (with count)
router.get("/list", async (req, res) => {
   try {
      const category = await Category.find({});

      res.status(200).json({
         data: category,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// list count category api (with count)
router.get("/count", async (req, res) => {
   try {
      const category = await Job.aggregate([
         { $match: { isActive: true, isRemoved: false } },
         {
            $lookup: {
               from: "categories",
               localField: "category",
               foreignField: "_id",
               as: "categoryInfo",
            },
         },
         {
            $unwind: "$categoryInfo",
         },
         {
            $group: {
               _id: "$category",
               count: { $sum: 1 },
            },
         },
         {
            $lookup: {
               from: "categories",
               localField: "_id",
               foreignField: "_id",
               as: "category",
            },
         },
         {
            $unwind: "$category",
         },
         {
            $project: {
               _id: "$category._id",
               name: "$category.name",
               count: "$count",
            },
         },
      ]);

      res.status(200).json({
         data: category,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
