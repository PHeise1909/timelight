const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    zone: {
        type: String,
        enum: ['green', 'red', 'blue'],
        required: true
    },
    answers: {
        type: [String],
        default: ['','','','','','','','','','']
    }
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;