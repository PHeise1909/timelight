require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/database');

const app = express();
const PORT = 3500;

connectDB();

mongoose.connection.once('open', () => {
    console.log('DB connected')
    app.listen(PORT, () => {console.log(`listening on Port: ${PORT}`)})
});


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
        // Legt fest, dass dieses Feld nur für den Fragetyp 'numeric' erforderlich ist
        required: function() {
            return this.type === 'numeric';
        }
    }
});

const Question = mongoose.model('Question', questionSchema, 'questions');
/*
// Beispiel für eine Single-Choice-Frage
const singleChoiceQuestion = new Question({
    question: 'Was ist die Hauptstadt von Frankreich?',
    type: 'single-choice',
    answers: [
        { text: 'Paris', isCorrect: true },
        { text: 'Berlin', isCorrect: false },
        { text: 'London', isCorrect: false },
        { text: 'Rom', isCorrect: false }
    ]
});

// Beispiel für eine Numeric-Frage
const numericQuestion = new Question({
    question: 'Wie viele Kontinente gibt es auf der Erde?',
    type: 'numeric',
    correctNumericAnswer: 7
});

// Weitere Beispiele für verschiedene Fragetypen können hinzugefügt werden

// Speichern der Fragen in der Datenbank
singleChoiceQuestion.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });

numericQuestion.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    }); */

Question.find({})
    .then((data) => {
        
        const dataObject = data;
        console.log(dataObject)
        console.log(dataObject[0].answers)
    })
    .catch((err) => {
        console.log('Error: ', err)
    })