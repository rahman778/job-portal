const Mongoose = require("mongoose");

const { ROLES, EMAIL_PROVIDER } = require("../constants");

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
   email: {
      type: String,
      required: function () {
         return this.provider === EMAIL_PROVIDER.Email;
      },
   },
   phoneNumber: {
      type: String,
      required: [true, "Mobile number field required!"],
   },
   firstName: {
      type: String,
      required: [true, "First name field required!"],
   },
   lastName: {
      type: String,
      required: [true, "Last name field required!"],
   },
   password: {
      type: String,
      required: [true, "Password field required!"],
   },
   provider: {
      type: String,
      required: true,
      default: EMAIL_PROVIDER.Email,
   },
   googleId: {
      type: String,
   },
   role: {
      type: String,
      default: ROLES.Candidate,
      enum: [ROLES.Admin, ROLES.Recruiter, ROLES.Candidate],
   },
   verified: {
      type: Boolean,
      default: false,
   },
   accountConfirmToken: { type: String },
   resetPasswordToken: { type: String },
   resetPasswordExpires: { type: Date },
   updated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
});

module.exports = Mongoose.model("User", UserSchema);
