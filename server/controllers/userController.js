const User = require('../models/user');

const setUser = async (req, res) => {
    try{
        console.log("Save user");

        const user = new User({zone: 'blue'});
        savedUser = await user.save();
        res.status(201).json({ _id: savedUser._id, message: 'Daten erfolgreich hinzugefügt'});
    } catch {
        console.error(error);
        res.status(500).json({error: 'Interner Serverfehler'});
    }
}

module.exports = { setUser };