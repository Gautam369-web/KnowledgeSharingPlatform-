const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateProfile,
    getLeaderboard,
    getUserStats
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/leaderboard', getLeaderboard);
router.get('/profile/:id', getUserProfile);
router.get('/stats', protect, getUserStats);
router.put('/profile', protect, updateProfile);

module.exports = router;
