const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const passport = require("passport");

const auth = require("../../middleware/auth");

const User = require("../../models/user");
const Candidate = require("../../models/candidate");
const Recruiter = require("../../models/recruiter");

const mailgun = require("../../services/mailgun");
const keys = require("../../config/keys");
const { EMAIL_PROVIDER, ROLES } = require("../../constants");
const uploadImage = require("../../utils/storage");

const { secret, tokenLife } = keys.jwt;

router.post("/login", async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email) {
         return res.status(400).json({ error: "You must enter an email address." });
      }

      if (!password) {
         return res.status(400).json({ error: "You must enter a password." });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).send({ error: "Invalid Credentials" });
      }

      if (user && user.provider !== EMAIL_PROVIDER.Email) {
         return res.status(400).send({
            error: `Rmail address is already in use using ${user.provider} provider.`,
         });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({
            success: false,
            error: "Invalid Credentials",
         });
      }

      const payload = {
         id: user.id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

      if (!token) {
         throw new Error();
      }

      res.status(200).json({
         success: true,
         token,
         user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
         },
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

router.post("/register",  async (req, res) => {
   try {
      const {
         email,
         firstName,
         lastName,
         password,
         phoneNumber,
         role,
         companyName,
         education,
         skills,
         bio,
      } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ error: "Email address is already in use." });
      }

      const user = new User({
         email,
         password,
         firstName,
         lastName,
         phoneNumber,
         role,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;

      const registeredUser = await user.save();

      if (role === ROLES.Recruiter) {
         const recruiter = new Recruiter({
            user: registeredUser.id,
            // companyName,
            // logo: logo.location,
         });

         await recruiter.save();
      } else if (role === ROLES.Candidate) {
         const candidate = new Candidate({
            user: registeredUser.id,
            // education: education,
            // skills: skills,
            // bio: bio,
         });

         await candidate.save();
      }

      const payload = {
         id: registeredUser.id,
      };

      await mailgun.sendEmail(registeredUser.email, "signup", null, registeredUser);

      const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

      res.status(200).json({
         success: true,
         token,
         user: {
            id: registeredUser.id,
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            email: registeredUser.email,
            role: registeredUser.role,
            phoneNumber: registeredUser.phoneNumber
         },
      });
   } catch (error) {
      console.log(error)
      res.status(400).json({
         error,
      });
   }
});

router.post("/forgot-password", async (req, res) => {
   try {
      const { email } = req.body;

      if (!email) {
         return res.status(400).json({ error: "You must enter an email address." });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
         return res.status(400).send({ error: "No user found for this email address." });
      }

      const buffer = crypto.randomBytes(48);
      const resetToken = buffer.toString("hex");

      existingUser.resetPasswordToken = resetToken;
      existingUser.resetPasswordExpires = Date.now() + 3600000;

      existingUser.save();

      await mailgun.sendEmail(existingUser.email, "reset", req.headers.host, resetToken);

      res.status(200).json({
         success: true,
         resetToken,
         message: "Please check your email for the link to reset your password.",
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

router.post("/reset-password/:token", async (req, res) => {
   try {
      const {} = req.body;

      if (!password) {
         return res.status(400).json({ error: "You must enter a password." });
      }

      const resetUser = await User.findOne({
         resetPasswordToken: req.params.token,
         resetPasswordExpires: { $gt: Date.now() },
      });

      if (!resetUser) {
         return res.status(400).json({
            error: "Your token has expired. Please attempt to reset your password again.",
         });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      resetUser.password = hash;
      resetUser.resetPasswordToken = undefined;
      resetUser.resetPasswordExpires = undefined;

      resetUser.save();

      await mailgun.sendEmail(resetUser.email, "reset-confirmation");

      res.status(200).json({
         success: true,
         message: "Password changed successfully. Please login with your new password.",
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

router.post("/change-password", auth, async (req, res) => {
   try {
      const { password, confirmPassword } = req.body;
      const email = req.user.email;

      if (!email) {
         return res.status(401).send("Unauthenticated");
      }

      if (!password) {
         return res.status(400).json({ error: "You must enter a password." });
      }

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
         return res.status(400).json({ error: "Email address is already in use." });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (!isMatch) {
         return res.status(400).json({ error: "Please enter your correct old password." });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(confirmPassword, salt);
      existingUser.password = hash;
      existingUser.save();

      await mailgun.sendEmail(existingUser.email, "reset-confirmation");

      res.status(200).json({
         success: true,
         message: "Password changed successfully. Please login with your new password.",
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

router.get(
   "/login/google",
   passport.authenticate("google", {
      session: false,
      scope: ["profile", "email"],
      accessType: "offline",
      approvalPrompt: "force",
   })
);

router.get(
   "/google/callback",
   passport.authenticate("google", {
      failureRedirect: `${keys.app.clientURL}/login`,
      session: false,
   }),
   (req, res) => {
      const payload = {
         id: req.user.id,
      };

      const token = jwt.sign(payload, secret, { expiresIn: tokenLife });
      const jwtToken = `Bearer ${token}`;
      res.redirect(`${keys.app.clientURL}/auth/success?token=${jwtToken}`);
   }
);

// router.post("/upload", uploadImage.single("logo"), async (req, res) => {
//    const imageUrl = req.file;

//    console.log("imageUrl", imageUrl);

//    return res.status(200).json({
//       success: "Success",
//    });
// });

module.exports = router;
