const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Registration
router.post('/register', userController.register);
// Login
router.post('/login', userController.login);
// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), userController.googleLogin);
// Get user profile
router.get('/profile', auth, userController.getProfile);
// Update user profile
router.put('/profile', auth, upload.single('profilePic'), userController.updateProfile);

module.exports = router; 