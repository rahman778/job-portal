const Mongoose = require("mongoose");

const { EXPERIENCE } = require("../constants");

const { Schema } = Mongoose;

const CanidateSchema = Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   currentRole: {
      type: String,
   },
   skills: [String],
   searchTerms: [String],
   experienceLevel: {
      type: String,
      enum: [EXPERIENCE.Beginner, EXPERIENCE.Intermediate, EXPERIENCE.Expert],
   },
   experience: [
      {
         title: {
            type: String,
            required: true,
         },
         organization: {
            type: String,
            required: true,
         },
         startYear: {
            type: Number,
            min: 1930,
            max: new Date().getFullYear(),
            required: true,
            validate: Number.isInteger,
         },
         endYear: {
            type: Number,
            max: new Date().getFullYear(),
            validate: [
               { validator: Number.isInteger, msg: "Year should be an integer" },
               {
                  validator: function (value) {
                     return this.startYear <= value;
                  },
                  msg: "End year should be greater than or equal to Start year",
               },
            ],
         },
      },
   ],
   education: [
      {
         title: {
            type: String,
            required: true,
         },
         institutionName: {
            type: String,
            required: true,
         },
         startYear: {
            type: Number,
            min: 1930,
            max: new Date().getFullYear(),
            required: true,
            validate: Number.isInteger,
         },
         endYear: {
            type: Number,
            max: new Date().getFullYear(),
            validate: [
               { validator: Number.isInteger, msg: "Year should be an integer" },
               {
                  validator: function (value) {
                     return this.startYear <= value;
                  },
                  msg: "End year should be greater than or equal to Start year",
               },
            ],
         },
      },
   ],
   avatar: { type: String },
   resume: {
      type: String,
   },
   bio: {
      type: String,
   },
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model("Candidate", CanidateSchema);
