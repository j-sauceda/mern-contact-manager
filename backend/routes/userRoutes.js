// load express router
const express = require('express');
const router = express.Router();

// load user handler-functions
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

// middleware
const { protect } = require('../middleware/authMiddleware');

// set routes
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;