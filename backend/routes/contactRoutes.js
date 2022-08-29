// load express router
const express = require('express');
const router = express.Router();

// load controller handler-functions
const {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// middleware
const { protect } = require('../middleware/authMiddleware');

// set routes
router.route('/')
  .get(protect, getContacts)
  .post(protect, setContact);
router.route('/:id')
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;