const Mongoose = require("mongoose");

const { RECRUITER_STATUS } = require("../constants");

const { Schema } = Mongoose;

// Recruiter Schema
const RecruiterSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   companyName: {
      type: String,
      trim: true,
      required: [true, "Company name is required!"],
   },
   logo: {
      type: String,
   },
   isActive: {
      type: Boolean,
      default: false,
   },
   status: {
      type: String,
      default: RECRUITER_STATUS.Waiting_Approval,
      enum: [
         RECRUITER_STATUS.Waiting_Approval,
         RECRUITER_STATUS.Rejected,
         RECRUITER_STATUS.Approved,
      ],
   },
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model("Recruiter", RecruiterSchema);
