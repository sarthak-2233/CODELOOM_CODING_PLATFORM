const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/user/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ emailId: profile.emails[0].value });
      
      if (user) {
        return done(null, user);
      } else {
        user = await User.create({
          firstName: profile.name.givenName,
          emailId: profile.emails[0].value,
          password: "google-auth-" + Math.random().toString(36),
          role: 'user'
        });
        return done(null, user);
      }
    } catch (err) {
      return done(err, null);
    }
  }
));

// ✅ ADD THESE TWO FUNCTIONS
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});