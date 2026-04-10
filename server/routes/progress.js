const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

router.post('/update', protect, async (req, res) => {
  const { xpGained, diamondsGained, badgeEarned } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.xp += xpGained || 0;
    user.diamonds += diamondsGained || 0;
    
    // Level up logic (every 100 XP is a level)
    user.level = Math.floor(user.xp / 100) + 1;

    if (badgeEarned && !user.badges.includes(badgeEarned)) {
      user.badges.push(badgeEarned);
    }

    // Streak logic: (Omitted for simplicity, assuming constant update for demo)
    user.lastActive = new Date();

    await user.save();
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
