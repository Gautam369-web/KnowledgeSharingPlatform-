const express = require('express');
const router = express.Router();
const {
    getProblems,
    createProblem,
    getProblemById,
    voteProblem
} = require('../controllers/problemController');
const { protect } = require('../middleware/auth');

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', protect, createProblem);
router.put('/:id/vote', protect, voteProblem);

module.exports = router;
