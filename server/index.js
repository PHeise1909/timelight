const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/database');
const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/users');


const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3500;

connectDB();

app.use('/api/questions', questionRoutes);
app.use('/api/setUser', userRoutes);


mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});

