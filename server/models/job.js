const Mongoose = require("mongoose");

const { JOB_TYPE, JOB_MODALITY, EXPERIENCE } = require("../constants");

const { Schema } = Mongoose;

// Job Schema
const JobSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
   },
   category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
   skillsets: [String],
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
   experienceLevel: {
      type: String,
      enum: [EXPERIENCE.Beginner, EXPERIENCE.Intermediate, EXPERIENCE.Expert],
      required: true,
   },
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
   salary: {
      minSalary: {
         type: Number,
      },
      maxSalary: {
         type: Number,
      },
      frequency: {
         type: String,
      },
      currency: {
         type: String,
      },
   },  
   deadline: {
      type: Date,
   },
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model("Job", JobSchema);
