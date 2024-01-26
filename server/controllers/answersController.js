const User = require('../models/user')
const mongoose = require('mongoose');

const setAnswer = async (req, res) => {
    console.log("Anfrage zum speichern der Antwort")
    try {
        const { userId, position, answer } = req.body;
        console.log(req.body);
        console.log("Received userId:", userId, typeof userId);

        // Mongoose ObjectId verwenden
        const { Types } = mongoose;
        const userIdObject = Types.ObjectId.isValid(userId) ? new Types.ObjectId(userId) : null;
        console.log(userIdObject);

        const user = await User.findById(userIdObject);

        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User nicht gefunden!' });
        }

        user.answers[position] = answer;

        await user.save();

        res.status(200).json({ message: 'Antwort erfolgreich gespeichert' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = { setAnswer };