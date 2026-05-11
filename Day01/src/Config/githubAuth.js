const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../Models/userModel');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/user/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("GitHub Profile received:", profile.displayName || profile.username);
      
      // Get email from GitHub (GitHub may not always provide email)
      let email = profile.emails?.[0]?.value;
      
      // If no email provided, create a fake one using username
      if (!email) {
        email = `${profile.username}@github.com`;
      }
      
      // Check if user already exists
      let user = await User.findOne({ emailId: email });
      
      if (user) {
        // User exists, log them in
        console.log("Existing user found:", user.emailId);
        return done(null, user);
      } else {
        // Split displayName into firstName and lastName
        const fullName = profile.displayName || profile.username;
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0] || fullName;
        // ✅ Fix: Provide a default lastName if missing
        const lastName = nameParts.slice(1).join(' ') || "User";
        
        // Create new user from GitHub data
        user = await User.create({
          firstName: firstName,
          lastName: lastName,  // Now always has a value
          emailId: email,
          password: "github-auth-" + Math.random().toString(36) + Date.now(),
          role: 'user'
        });
        console.log("New user created from GitHub:", user.emailId);
        return done(null, user);
      }
    } catch (err) {
      console.error("GitHub auth error:", err);
      return done(err, null);
    }
  }
));

// Serialize and Deserialize user (same as Google)
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

module.exports = passport;