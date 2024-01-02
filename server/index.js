require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/database');

const questionRoutes = require('./routes/question');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3500;

connectDB();

app.use('/api/questions', questionRoutes);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});

