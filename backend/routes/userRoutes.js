const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateProfile,
    getLeaderboard,
    getUserStats,
    followUser,
    unfollowUser,
    getGlobalStats
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/global-stats', getGlobalStats);
router.get('/leaderboard', getLeaderboard);
router.get('/profile/:id', getUserProfile);
router.get('/stats', protect, getUserStats);
router.put('/profile', protect, updateProfile);

router.post('/follow/:id', protect, followUser);
router.post('/unfollow/:id', protect, unfollowUser);

module.exports = router;
