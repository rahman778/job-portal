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

const mailer = require("../../services/nodemailer");
const keys = require("../../config/keys");
const { EMAIL_PROVIDER, ROLES, PASSWORD_REGEX } = require("../../constants");

const { accessSecret, accessTokenLife, refreshSecret, refreshTokenLife } = keys.jwt;

router.post("/login", async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email) {
         return res.status(400).json({ message: "You must enter an email address." });
      }

      if (!password) {
         return res.status(400).json({ message: "You must enter a password." });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).send({ message: "Invalid Credentials" });
      }

      if (user && user.provider !== EMAIL_PROVIDER.Email) {
         return res.status(400).send({
            message: `Email address is already in use using ${user.provider} provider.`,
         });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({
            message: "Invalid Credentials",
         });
      }

      const payload = {
         id: user.id,
      };

      const accessToken = jwt.sign(payload, accessSecret, { expiresIn: accessTokenLife });

      if (!accessToken) {
         throw new Error();
      }

      // Generate a refresh token
      const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshTokenLife });

      res.status(201).json({
         success: true,
         accessToken,
         refreshToken,
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
         message: "Your request could not be processed. Please try again.",
      });
   }
});

router.post("/register", async (req, res) => {
   try {
      const { email, firstName, lastName, password, phoneNumber, role, companyName } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ message: "Email address is already in use." });
      }

      if (!PASSWORD_REGEX.test(password)) {
         return res.status(400).json({
            message:
               "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter and one numeric digit.",
         });
      }

      if (role === ROLES.Recruiter && !companyName) {
         return res.status(400).json({ message: "Company name is required" });
      }

      const buffer = crypto.randomBytes(48);
      const confirmationToken = buffer.toString("hex");

      const user = new User({
         email,
         password,
         firstName,
         lastName,
         phoneNumber,
         role,
         accountConfirmToken: confirmationToken,
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;

      const registeredUser = await user.save();

      if (role === ROLES.Recruiter) {
         const recruiter = new Recruiter({
            user: registeredUser.id,
            companyName,
         });

         await recruiter.save();
      } else if (role === ROLES.Candidate) {
         const candidate = new Candidate({
            user: registeredUser.id,
         });

         await candidate.save();
      }

      const payload = {
         id: registeredUser.id,
      };

      await mailer.sendEmail(registeredUser.email, "signup", req.headers.origin, registeredUser);

      const accessToken = jwt.sign(payload, accessSecret, { expiresIn: accessTokenLife });

      // Generate a refresh token
      const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshTokenLife });

      res.status(201).json({
         success: true,
         accessToken,
         refreshToken,
         user: {
            id: registeredUser.id,
            firstName: registeredUser.firstName,
            lastName: registeredUser.lastName,
            email: registeredUser.email,
            role: registeredUser.role,
            phoneNumber: registeredUser.phoneNumber,
         },
      });
   } catch (error) {
      console.log('error', error)
      res.status(400).json({ message: error });
   }
});

router.post("/token/refresh", async (req, res) => {
   try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
         return res.status(400).json({ error: "Refresh token is required." });
      }

      // Verify the refresh token
      jwt.verify(refreshToken, refreshSecret, async (err, decoded) => {
         if (err) {
            return res.status(401).json({ error: "Invalid or expired refresh token." });
         }

         const user = await User.findById(decoded.id);

         if (!user) {
            return res.status(404).json({ error: "User not found." });
         }

         // Generate a new access token
         const accessToken = jwt.sign({ id: user.id }, accessSecret, {
            expiresIn: accessTokenLife,
         });

         res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
               id: user.id,
               firstName: user.firstName,
               lastName: user.lastName,
               email: user.email,
               role: user.role,
            },
         });
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
      });
   }
});

router.post("/confirm-email/:token", async (req, res) => {
   try {
      const confirmUser = await User.findOne({
         accountConfirmToken: req.params.token,
      });

      if (!confirmUser) {
         return res.status(400).json({
            error: "User not found.",
         });
      }

      confirmUser.verified = true;
      confirmUser.accountConfirmToken = undefined;

      confirmUser.save();

      await mailer.sendEmail(confirmUser.email, "email-confirmation");

      const payload = {
         id: confirmUser.id,
      };

      const accessToken = jwt.sign(payload, accessSecret, { expiresIn: accessTokenLife });
      const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: refreshTokenLife });


      res.status(200).json({
         success: true,
         message: "Email confirmed",
         user: confirmUser,
         accessToken,
         refreshToken
         
      });
   } catch (error) {
      res.status(400).json({
         error: "Your request could not be processed. Please try again.",
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

      await mailer.sendEmail(existingUser.email, "reset", req.headers.host, resetToken);

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
      const {password} = req.body;

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

      await mailer.sendEmail(resetUser.email, "reset-confirmation");

      res.status(200).json({
         success: true,
         message: "Password changed successfully. Please login with your new password.",
      });
   } catch (error) {
      console.log('error', error)
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

      await mailer.sendEmail(existingUser.email, "reset-confirmation");

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

      const token = jwt.sign(payload, accessSecret, { expiresIn: accessTokenLife });
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
