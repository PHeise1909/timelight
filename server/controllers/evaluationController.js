const User = require('../models/user')

const countAnswers = (answers) => {
    return answers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
    }, {});
};

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
};

const countMatchingAnswers = (answers, mostCommonAnswer) => {
    const totalAnswers = answers.length;
    const matchingAnswers = answers.filter(answer => answer === mostCommonAnswer).length;
    return (matchingAnswers/totalAnswers)*100;
};

const sumOfAnswers = (answers) => {
    let sum = 0;

    for(const answer of answers){
        sum =+ Number(answer);
    }
    return sum;
}

evaluateQuestion = async(answersBlue, answersRed, answersGreen) => {

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
};

evaluateQuestionNumeric = async(answersBlue, answersRed, answersGreen) => {

    sumBlue = sumOfAnswers(answersBlue);
    sumRed = sumOfAnswers(answersRed);
    sumGreen = sumOfAnswers(answersGreen);
    console.log(sumBlue, sumRed, sumGreen)
    const maxSum = Math.max(sumBlue, sumRed, sumGreen);
    console.log('MaxSum ',maxSum)
    let zone = '';

    if(maxSum === sumBlue){
        zone = 'blue';
    } else if (maxSum === sumRed){
        zone = 'red';
    } else if (maxSum === sumGreen){
        zone = 'green';
    }

    const timeInHours = maxSum / 0.5;

    const timeInDays = timeInHours / 24;

    const result = {
        zone: zone,
        distance: maxSum,
        time: timeInDays
    }

    return result;
};


const getEvaluation = async (req, res) => {
    try{
        const questionIndex = req.query.questionIndex;
        
        if (isNaN(questionIndex)) {
            return res.status(400).json({ error: 'Ungültiger Frage-Index' });
        }

        const usersBlue = await User.find({zone: "blue"});
        const usersGreen = await User.find({zone: "green"});
        const usersRed = await User.find({zone: "red"});
        
        const answersBlue = usersBlue.map(user => user.answers[questionIndex-10]);
        const answersGreen = usersGreen.map(user => user.answers[questionIndex-10]);
        const answersRed = usersRed.map(user => user.answers[questionIndex-10]);

        let answerReturn = {};
        if(global.sharedValue === 10 || global.sharedValue === 12 || global.sharedValue === 13 || global.sharedValue === 16  || global.sharedValue === 17 || global.sharedValue === 18 || global.sharedValue === 19){
            console.log(global.sharedValue);
            answerReturn = evaluateQuestion(answersBlue, answersRed, answersGreen);
        } else if(global.sharedValue === 11 || global.sharedValue === 14 || global.sharedValue === 15){
            console.log(global.sharedValue);
            answerReturn = evaluateQuestionNumeric(answersBlue, answersRed, answersGreen);
        } else {
            console.log('No Questions left');
        }
        console.log(answerReturn);
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