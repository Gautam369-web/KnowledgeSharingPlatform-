const express = require('express');
const router = express.Router();
const {
    addSolution,
    voteSolution,
    acceptSolution
} = require('../controllers/solutionController');
const { protect } = require('../middleware/auth');

router.post('/:problemId', protect, addSolution);
router.put('/:id/vote', protect, voteSolution);
router.put('/:id/accept', protect, acceptSolution);

module.exports = router;
