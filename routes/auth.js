// routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/signup
router.post(
  '/signup',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Valid email is required').isEmail().normalizeEmail(),
    body('password', 'Password must be 6+ chars').isLength({ min: 6 })
  ],
  signup
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email', 'Valid email is required').isEmail().normalizeEmail(),
    body('password', 'Password is required').exists()
  ],
  login
);

module.exports = router;
