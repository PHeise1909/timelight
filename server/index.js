const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const connectDB = require('./config/database');
const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/users');
const answerRoutes = require('./routes/answer');
const evalRoutes = require('./routes/evaluation');

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3500;

connectDB();

app.use('/api/questions', questionRoutes);
app.use('/api/setUser', userRoutes);
app.use('/api/setAnswer', answerRoutes);
app.use('/api/eval', evalRoutes);

// WebSocket Server
const server = app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});

const wss = new WebSocket.Server({ server });
global.sharedValue = 0;

wss.on('connection', (socket) => {
    console.log('WebSocket connection established');

    // Initialen Wert an das Frontend senden
    socket.send(JSON.stringify({ type: 'update', value: sharedValue }));

    // Event zum Erhöhen des Werts
    socket.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'increment') {
            sharedValue += 1;
            broadcastUpdate();
        } else if (data.type === 'decrement') {
            sharedValue -= 1;
            broadcastUpdate();
        } else if (data.type === 'get') {
            // Event zum Abrufen des aktuellen Werts
            socket.send(JSON.stringify({ type: 'update', value: sharedValue }));
        }
    });
});

function broadcastUpdate() {
    const updateMessage = JSON.stringify({ type: 'update', value: sharedValue });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(updateMessage);
            console.log(updateMessage);
        }
    });
}

module.exports = { sharedValue };