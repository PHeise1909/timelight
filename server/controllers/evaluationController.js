const User = require('../models/user')
const mongoose = require('mongoose');

evaluateQuestion0 = async(answersBlue, answersRed, answersGreen) => {
    console.log(answersGreen);
    return answersGreen;
}

const getEvaluation = async (req, res) => {
    try{
        const questionIndex = req.query.questionIndex;

        if (isNaN(questionIndex)) {
            return res.status(400).json({ error: 'Ungültiger Frage-Index' });
        }

        const usersBlue = await User.find({zone: "blue"});
        const usersGreen = await User.find({zone: "green"});
        const usersRed = await User.find({zone: "red"});

        const answersBlue = usersBlue.map(user => user.answers[questionIndex]);
        const answersGreen = usersGreen.map(user => user.answers[questionIndex]);
        const answersRed = usersRed.map(user => user.answers[questionIndex]);
        
        const answerReturn = evaluateQuestion0(answersBlue, answersRed, answersGreen);
        res.status(200).json({
            answerReturn
        });
    }
    catch (error){
        console.error(error);
        res.status(500).json({ error: 'Inerner Serverfehler'});
    }
}

module.exports = { getEvaluation };