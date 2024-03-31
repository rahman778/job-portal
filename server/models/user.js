const Mongoose = require('mongoose');

const { ROLES, EMAIL_PROVIDER } = require('../constants');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
   email: {
      type: String,
      required: function () {
         return this.provider === EMAIL_PROVIDER.Email;
      }
   },
   phoneNumber: {
      type: String
   },
   firstName: {
      type: String
   },
   lastName: {
      type: String
   },
   password: {
      type: String
   },
   recruiter: {
      type: Schema.Types.ObjectId,
      ref: 'Recruiter',
      default: null
   },
   provider: {
      type: String,
      required: true,
      default: EMAIL_PROVIDER.Email
   },
   googleId: {
      type: String
   },
   resume: {
      type: String,
      default: null
   },
   avatar: {
      type: String
   },
   role: {
      type: String,
      default: ROLES.Recruiter,
      enum: [ROLES.Admin, ROLES.Recruiter, ROLES.Candidate]
   },
   resetPasswordToken: { type: String },
   resetPasswordExpires: { type: Date },
   updated: Date,
   created: {
      type: Date,
      default: Date.now
   }
});

module.exports = Mongoose.model('User', UserSchema);
