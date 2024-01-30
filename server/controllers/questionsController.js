const Question = require('../models/question');

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({}).sort({id: 1});
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getQuestions };