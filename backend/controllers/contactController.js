// load libraries
const asyncHandler = require('express-async-handler');

// load data model
const Contact = require('../models/contactModel');

// @desc    Set contact
// @route   POST /api/contact
// @access  Private
const setContact = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.phone || !req.body.email || !req.body.relation) {
    res.status(400);
    throw new Error('Please fill all contact fields');
  }

  const contact = await Contact.create({
    user: req.user.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    relation: req.body.relation,
  });
  
  res.status(200).json(contact);
});


// @desc    Get contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id });
  res.status(200).json(contacts);
});


// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  // find contact
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }
  // find user
  if (!req.user) {
    res.status(401);
    throw new Error('User not logged in');
  }
  // Ensure the logged in user matches the contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  // update contact
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, })

  res.status(200).json(updatedContact);
});


// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  // find contact
  if (!contact) {
    res.status(400);
    throw new Error('Contact not found');
  }
  // find user
  if (!req.user) {
    res.status(401);
    throw new Error('User not logged in');
  }
  // Ensure the logged in user matches the contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  // remove contact
  await contact.remove()
  res.status(200).json({ id: req.params.id });
})


module.exports = {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
};