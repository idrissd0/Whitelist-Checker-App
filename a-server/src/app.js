var Express = require('express')
var Mongoclient = require('mongodb').MongoClient
var cors = require('cors')
const multer = require('multer')
const { ObjectId } = require('mongodb')
const axios = require('axios')
require('dotenv').config()
const auth = require('./routes/auth')

// MongoDB * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
const username = encodeURIComponent('Driss')
const password = encodeURIComponent('IP.ic@tc0sp')
const cluster = 'cluster0.pesps5y.mongodb.net' // The cluster name or hostname
const authSource = 'admin' // The authentication source
const authMechanism = 'SCRAM-SHA-1' // The authentication mechanism

var app = Express()
app.use(cors())

// Conncetion string of mongodb
const uri = `mongodb+srv://${username}:${password}@${cluster}/${authSource}?retryWrites=true&w=majority&authMechanism=${authMechanism}`

var DATABASENAME = 'supafire'
var database

// Discord * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

app.get('/auth/discord', async (req, res) => {
    const code = req.query.code
    const params = new URLSearchParams()
    let user
    params.append('client_id', '1172086920940093450')
    params.append('client_secret', '62lD33OmKSDG_O1PDYKL6p_IwYOMENoZ')
    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('redirect_uri', 'http://localhost:3020/auth/discord')
    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', params)
        const { access_token, token_type } = response.data
        const userDataResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        })
        console.log('Data: ', userDataResponse.data)
        user = {
            username: userDataResponse.data.username,
            credential: userDataResponse.data.id,
            icon: userDataResponse.data.avatar,
            // email: userDataResponse.data.email,
            avatar: `https://cdn.discordapp.com/avatars/${userDataResponse.data.id}/${userDataResponse.data.avatar}.png`
        }
        console.log('User :', user)

        // Check if the user already exists in MongoDB
        const existingUser = await database.collection('Users').findOne({ credential: userDataResponse.data.id })

        if (existingUser) {
            // User exists, proceed with the redirect
            res.redirect(
                `http://localhost:3000/?username=${user.username}&credential=${user.credential}&avatar=${user.avatar}`
            )
        } else {
            // User does not exist, add new user to MongoDB
            const newUser = {
                credential: user.credential,
                username: user.username,
                avatar: `https://cdn.discordapp.com/avatars/${userDataResponse.data.id}/${userDataResponse.data.avatar}.png`,
                projects: []
            }
            // Add the new user to the MongoDB collection
            console.log('New User :', newUser)
            await database.collection('Users').insertOne(newUser)

            // Redirect to the React.js route with new user data as URL parameters
            res.redirect(
                `http://localhost:3000/?username=${user.username}&userid=${user.credential}&avatar=${user.avatar}`
            )
        }

        // Redirect to the React.js route with user data as URL parameters
        // res.redirect(
        //     `http://localhost:3000/?username=${user.username}&credential=${user.credential}&avatar=${user.avatar}`
        // )
    } catch (error) {
        console.log('Error', error)
        return res.send('Some error occurred! ')
    }
})

app.get('/api/user/projects/:credential', (req, res) => {
    const userCredential = reu.params.credential

    // Find the user by his credentials
    database.collection('Users').findOne({ credential: userCredential }, (error, user) => {
        if (error) {
            res.status(500).json('Error occured while retrieving projects.')
        } else if (!user) {
            res.status(400).json('User not found', user)
        } else {
            // get the user's projects
            const projects = user.projects
            res.status(200).json(projects)
        }
    })
})

// Connecting the server & MongoDB database * * * * * * * * * * * * * *
app.listen(3020, () => {
    Mongoclient.connect(uri, (error, client) => {
        if (error) {
            console.error('Mongo DB Connection Error:', error)
        } else {
            database = client.db(DATABASENAME)
            console.log('Mongo DB Connection Successful')
        }
    })
    console.log('Server started at 3020')
})
