const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/public', express.static('public'))



mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, console.log(`Server started on: http://localhost:${process.env.PORT}`))
    })
    .catch(() => {
        console.log('Could not connect to the database.')
    })