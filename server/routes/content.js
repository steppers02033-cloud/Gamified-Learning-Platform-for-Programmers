const express = require('express');
const { Section } = require('../models/Content');

const router = express.Router();

// Get all sections
router.get('/', async (req, res) => {
  try {
    // Return dummy data if DB empty
    let sections = await Section.find({}).sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
