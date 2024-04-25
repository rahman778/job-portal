const express = require("express");
const router = express.Router();

const Skill = require("../../models/skill");

const auth = require("../../middleware/auth");
const role = require("../../middleware/role");

const { ROLES } = require("../../constants");

//add skills api
router.post("/add", auth, role.check(ROLES.Admin), async (req, res) => {
   try {
      const { name } = req.body;

      const newSkill = new Skill({
         name,
      });

      const savedSkill = await newSkill.save();

      res.status(200).json({
         success: true,
         message: `Skill has been added successfully!`,
         comment: savedSkill,
      });
   } catch (e) {
      return res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

// search skills api
router.get("/autocomplete/:query", auth, async (req, res) => {
   try {
      const query = req.params.query;

      const skills = await Skill.find({
         name: { $regex: new RegExp(query, "i") },
      }).limit(10);

      res.status(200).json({
         skills,
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

module.exports = router;
