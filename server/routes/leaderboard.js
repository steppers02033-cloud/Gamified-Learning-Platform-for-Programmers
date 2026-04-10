const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Top users sorted by XP, max 50
    const leaderboard = await User.find({})
      .select('username xp level badges')
      .sort({ xp: -1 })
      .limit(50);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
