const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const CanidateSchema = Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   education: [
      {
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
   skills: [String],
   avatar: String,
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
