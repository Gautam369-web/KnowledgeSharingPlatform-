const Problem = require('../models/Problem');

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().populate('author', 'name avatar');
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching problems', error: error.message });
    }
};

exports.createProblem = async (req, res) => {
    try {
        const problem = await Problem.create(req.body);
        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ message: 'Error creating problem', error: error.message });
    }
};
