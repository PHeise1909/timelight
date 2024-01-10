const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { EventEmitter } = require('events');

const connectDB = require('./config/database');
const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 3500;

const eventEmitter = new EventEmitter();
let currentValue = 0;

//SSE-Endpunkt für die Clients
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    //Schließen der Verbindung
    req.on('close', () => {
        res.end();
    });

    //Event-Listener für das 'Update'-Ereignis
    const updateListener = (value) => {
        res.write(`data: ${JSON.stringify({type: 'update', value: currentValue})}\n\n`);
    };

    //Beim "update" Ereignis, sende den aktualisierten Wert an den Client
    eventEmitter.on('update', updateListener);

    // Beim Schließen der Verbindung, entferne den Event-Listener
    req.on('close', () => {
    eventEmitter.off('update', updateListener);
    });
});

//Funktion zum Aktualisieren des Werts von der Admin-Seite
app.post('/updateValue', (req, res) => {
    const { action } = req.body;

    if(action === 'increment'){
        currentValue++;
    } else if(action === 'decrement'){
        currentValue--;
    }

    eventEmitter.emit('update');
    res.json({success: true, value: currentValue});
});

// Routen zum Abrufen des initialen Werts
app.get('/api/getInitialValue', (req, res) => {
    res.json({ value: currentValue });
});

connectDB();

app.use('/api/questions', questionRoutes);
app.use('/api/setUser', userRoutes);


mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on Port: ${PORT}`);
    });
});

