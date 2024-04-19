const Mongoose = require("mongoose");

const { APPLICATION_STATUS } = require("../constants");

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
      enum: [
         APPLICATION_STATUS.Screening,
         APPLICATION_STATUS.Interview,
         APPLICATION_STATUS.Shortlisted,
         APPLICATION_STATUS.Rejected,
      ],
      default: APPLICATION_STATUS.Screening,
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
