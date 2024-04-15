const Mongoose = require("mongoose");

const { Schema } = Mongoose;

// Job Schema
const JobSchema = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   maxApplicants: {
      type: Number,
   },
   activeApplications: {
      type: Number,
      default: 0,
   },
   acceptedCandidates: {
      type: Number,
      default: 0,
   },
   dateOfPosting: {
      type: Date,
      default: Date.now,
   },
   deadline: {
      type: Date,
   },
   skillsets: [String],
   jobType: {
      type: String,
      required: true,
   },
   modality: {
      type: String,
   },
   location: {
      type: String,
   },
   minSalary: {
      type: Number,
   },
   maxSalary: {
      type: Number,
   },
   salaryFrequency: {
      type: Number,
   },
   salaryCurrency: {
      type: Number,
   },
   tags: [
      {
         type: String,
      },
   ],
   updated: Date,
   created: {
      type: Date,
      default: Date.now
   }
});

module.exports = Mongoose.model("Job", JobSchema);
