const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Model = require("./auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3200/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Model.findOne({ googleId: profile.id });
        if (user) {
          //if user registered with google or has logged in with google
          user.lastLogin = Date.now();
          await user.save();
          console.log(
            "Registered with google/LoggedIn with google before, Login successful",
          );
        } else {
          //user exists manually
          const email = profile.emails[0].value;

          user = await Model.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            if (user.isVerified == false) {
              user.isVerified = true;
            }
            user.lastLogin = Date.now();
            await user.save();
            console.log("Manually exists, Login with google successful");
          } else {
            //user does not exist at all
            user = await Model.create({
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              googleId: profile.id,
              email: profile.emails[0].value,
              password: null,
              isVerified: true,
              authProvider: "google"
            });
          }
          console.log("Registration with Google successful");
        }
        const token = generateToken(user);
        done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    },
  ),
);

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"]
});

const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, data) => {
    if (err || !data) {
      return res.redirect("/login");
    }

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3200";

    const token = data.token;

    res.redirect(
      `${FRONTEND_URL}/api/v1/auth/success-callback?token=${token}`,
    );
  })(req, res, next);
};

module.exports = {
    googleLogin,
    googleCallback
}