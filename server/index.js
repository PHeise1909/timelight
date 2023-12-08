require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const connectDB = require('./config/database')

const app = express()
const PORT = 3500

connectDB()

mongoose.connection.once('open', () => {
    console.log('DB connected')
    app.listen(PORT, () => {console.log(`listening on Port: ${PORT}`)})
})