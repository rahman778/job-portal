const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// Category Schema
const CategorySchema = new Schema({
   name: {
      type: String,
      required: true,
   },
});

module.exports = Mongoose.model("Category", CategorySchema);
