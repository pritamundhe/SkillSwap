const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Adjust the path as necessary
const router = express.Router();


router.get('/Profile', protect, (req, res) => {
  res.status(200).json({
    message: 'Profile data retrieved successfully',
    user: req.user, // This will be the authenticated user
  });
});

// Other routes...

module.exports = router;
