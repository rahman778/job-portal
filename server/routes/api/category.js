const express = require("express");
const router = express.Router();

const Category = require("../../models/category");

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

// lise category api
router.get("/list", async (req, res) => {
   try {
      const category = await Category.find();

      res.status(200).json({
         category,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
