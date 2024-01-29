const User = require('../models/user')
const {getSharedValue} = require('../index');

const countAnswers = (answers) => {
    return answers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
    }, {});
}

const getMostCommonAnswer = (answers) => {
    const countMap = countAnswers(answers);
    let mostCommonAnswer = '';
    let maxCount = 0;
    for(const [answer, count] of Object.entries(countMap)){
        if(count > maxCount) {
            mostCommonAnswer = answer;
            maxCount = count;
        }
    }
    return mostCommonAnswer;
}

const countMatchingAnswers = (answers, mostCommonAnswer) => {
    const totalAnswers = answers.length;
    const matchingAnswers = answers.filter(answer => answer === mostCommonAnswer).length;
    return (matchingAnswers/totalAnswers)*100;
}

evaluateQuestionMusic = async(answersBlue, answersRed, answersGreen) => {

    const mostCommonBlue = getMostCommonAnswer(answersBlue);
    const mostCommonRed = getMostCommonAnswer(answersRed);
    const mostCommonGreen = getMostCommonAnswer(answersGreen);

    const percentageMatchingBlue = countMatchingAnswers(answersBlue, mostCommonBlue);
    const percentageMatchingRed = countMatchingAnswers(answersRed, mostCommonRed);
    const percentageMatchingGreen = countMatchingAnswers(answersGreen, mostCommonGreen);

    const result = {
        blue: {
            answer: mostCommonBlue,
            percentage: percentageMatchingBlue
        },
        red: {
            answer: mostCommonRed,
            percentage: percentageMatchingRed
        },
        green: {
            answer: mostCommonGreen,
            percentage: percentageMatchingGreen
        }
    }
    console.log(result);
    return result;
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
        
        const answerReturn = evaluateQuestionMusic(answersBlue, answersRed, answersGreen);;

        if(getSharedValue == 10){
            answerReturn = evaluateQuestionMusic(answersBlue, answersRed, answersGreen);
        }
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