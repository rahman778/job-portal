const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const ApplicationSchema = Schema({
   job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
   },
   applicant: {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
   },
   status: {
      type: String,
      enum: ["Screening", "Interview", "Shortlisted", "Rejected"],
      default: "Screening",
   },
   applicationDate: {
      type: Date,
      default: Date.now,
   },
   coverLetter: {
      type: String,
   },
   resume: {
      type: String,
      required: true,
   },
});

module.exports = Mongoose.model("Application", ApplicationSchema);
