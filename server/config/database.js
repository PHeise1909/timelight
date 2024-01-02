const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {});
        console.log('DB connected');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = connectDB;