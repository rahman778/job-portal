const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const keys = require("./keys");
const { EMAIL_PROVIDER } = require("../constants");

const { google } = keys;

const User = mongoose.model("User");
const secret = keys.jwt.accessSecret;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(
   new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
         .then((user) => {
            if (user) {
               return done(null, user);
            }

            return done(null, false);
         })
         .catch((err) => {
            return done(err, false);
         });
   })
);

module.exports = async (app) => {
   app.use(passport.initialize());

   await googleAuth();
};

const googleAuth = async () => {
   try {
      passport.use(
         new GoogleStrategy(
            {
               clientID: google.clientID,
               clientSecret: google.clientSecret,
               callbackURL: google.callbackURL,
            },
            (accessToken, refreshToken, profile, done) => {
               User.findOne({ email: profile.email })
                  .then((user) => {
                     if (user) {
                        return done(null, user);
                     }

                     const name = profile.displayName.split(" ");

                     const newUser = new User({
                        provider: EMAIL_PROVIDER.Google,
                        googleId: profile.id,
                        email: profile.email,
                        firstName: name[0],
                        lastName: name[1],
                        avatar: profile.picture,
                        password: null,
                        verified: true
                     });

                     newUser.save((err, user) => {
                        if (err) {
                           return done(err, false);
                        }

                        return done(null, user);
                     });
                  })
                  .catch((err) => {
                     return done(err, false);
                  });
            }
         )
      );
   } catch (error) {
      console.log("Missing google keys");
   }
};
