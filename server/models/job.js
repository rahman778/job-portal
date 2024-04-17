const Mongoose = require("mongoose");

const { JOB_TYPE, JOB_MODALITY } = require("../constants");

const { Schema } = Mongoose;

// Job Schema
const JobSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
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
   isActive: {
      type: Boolean,
      default: true,
   },
   isRemoved: {
      type: Boolean,
      default: false,
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
      default: JOB_TYPE.Full_Time,
      enum: [JOB_TYPE.Full_Time, JOB_TYPE.Part_Time, JOB_TYPE.Contract, JOB_TYPE.Internship],
      required: true,
   },
   modality: {
      type: String,
      default: JOB_MODALITY.On_Site,
      enum: [JOB_MODALITY.On_Site, JOB_MODALITY.Hybrid, JOB_MODALITY.Remote],
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
   salaryCurrency: {
      type: String,
   },
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model("Job", JobSchema);
