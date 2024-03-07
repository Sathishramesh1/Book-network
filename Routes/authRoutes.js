import express from 'express';
import passport from '../passport.js'; // Import your Passport configuration
import dotenv from 'dotenv';

const router = express.Router();

// Configuration .env files
dotenv.config();

// Google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
