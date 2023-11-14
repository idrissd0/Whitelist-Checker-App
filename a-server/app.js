const express = require('express')
const axios = require('axios')
var cors = require('cors')
const oauth2Route = require('./routes/oauth2/auth')
require('dotenv').config()
// const connectToMongoDB = require('./routes/mongodb/mongo')
// const goRoute = require('./routes/mongodb/mongo')

const multer = require('multer')
const { ObjectId } = require('mongodb')
var Mongoclient = require('mongodb').MongoClient

const username = encodeURIComponent('Driss')
const password = encodeURIComponent('IP.ic@tc0sp')
const cluster = 'cluster0.pesps5y.mongodb.net' // The cluster name or hostname
const authSource = 'admin' // The authentication source
const authMechanism = 'SCRAM-SHA-1' // The authentication mechanism

const app = express()
app.use(cors())

// Conncetion string of mongodb
const uri = `mongodb+srv://${username}:${password}@${cluster}/${authSource}?retryWrites=true&w=majority&authMechanism=${authMechanism}`

var DATABASENAME = 'supafire'
var database

// * * * * *
app.use('/oauth', oauth2Route)
// app.use('/go', goRoute)

// * * * * *
// connectToMongoDB(app)

app.get('/api/supafire/projects', (request, response) => {
    database
        .collection('projects')
        .find({})
        .toArray((error, result) => {
            response.send(result)
        })
})

app.listen(3020, () => {
    Mongoclient.connect(uri, (error, client) => {
        if (error) {
            console.error('Mongo DB Connection Error:', error)
        } else {
            database = client.db(DATABASENAME)
            console.log('Mongo DB Connection Successful')
        }
    })
})

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
// })
