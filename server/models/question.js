const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['single-choice', 'multiple-choice', 'true-false', 'numeric'],
        required: true
    },
    answers: [answerSchema],
    correctNumericAnswer: {
        type: Number,
        required: function() {
            return this.type === 'numeric';
        }
    }
});

const Question = mongoose.model('Question', questionSchema, 'questions')

module.exports = Question;