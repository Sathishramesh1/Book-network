import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from './model/UserModel.js';

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async(accessToken, refreshToken, profile, done) => {
    
    try {
        // Find or create the user
        let user = await User.findOne({ googleId: profile.id });
  
        if (!user) {
          user = new User({
            username: profile.displayName, // Customize as needed
            email: profile.emails[0].value,
            googleId: profile.id
          });
          await user.save();
        }
  
        // Pass the user to the next middleware
        done(null, user);
      } catch (error) {
        // If an error occurs, pass it to the next middleware
        done(error);
      }
    }
  
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });


export { passport};
