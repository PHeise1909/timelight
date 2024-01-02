const User = require('../models/user');

const createUser = async (req, res) => {
    try{
        const userData = req.body;
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error){
        console.error('Error creating User:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

module.exports = { createUser };