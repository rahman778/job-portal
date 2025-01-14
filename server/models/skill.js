const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Skill Schema
const SkillSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
});

module.exports = Mongoose.model("Skill", SkillSchema);
