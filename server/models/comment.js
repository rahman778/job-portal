const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// Comment Schema
const CommentSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
   },
   comment: {
      type: String,
      maxlength: 1000,
      required: true,
   },
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model("Comment", CommentSchema);
