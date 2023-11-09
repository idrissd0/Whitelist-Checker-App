var Express = require('express')
var Mongoclient = require('mongodb').MongoClient
var cors = require('cors')
const multer = require('multer')
const { ObjectId } = require('mongodb')

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

app.get('/api/supafire/getProjects/:userId', (request, response) => {
    const userId = request.params.userId

    // Convert the userId to ObjectId
    const userIdObject = new ObjectId(userId)

    // Find the user by their ID
    database.collection('Users2').findOne({ _id: userIdObject }, (error, user) => {
        if (error) {
            response.status(500).json('Error occurred while retrieving projects.')
        } else if (!user) {
            response.status(404).json('User not found.')
        } else {
            // Get the user's projects
            const projects = user.projects
            response.status(200).json(projects)
        }
    })
})

app.get('/api/supafire/projects', (request, response) => {
    database
        .collection('projects')
        .find({})
        .toArray((error, result) => {
            response.send(result)
        })
})

app.post('/api/supafire/addProject', multer().none(), (request, response) => {
    database.collection('projects').count({}, (error, numOfDocs) => {
        const newProject = {
            // projectId: (numOfDocs + 1).toString(),
            projectId: '4',
            projectWallet: [
                {
                    walletId: '1',
                    walletContent:
                        'agoric1mzcem9ju5fluc66v6cv32ezpc7hr5ugan0nx5a,\nagoric1mzcem9ju5fluc66v6cv32ezpc7hr5ugan0nx5a'
                }
            ],
            projectDesc: 'this is a second project from server action'
        }

        database.collection('projects').insertOne(newProject, (error, result) => {
            if (error) {
                response.status(500).json('Error occurred while adding the project.')
            } else {
                response.status(200).json('Added Successfully')
            }
        })
    })
})

app.post('/api/supafire/addUser', multer().none(), (request, response) => {
    database.collection('Users2').count({}, (error, numOfDocs) => {
        const newUser = {
            disCredential: 'test',
            name: 'testD',
            imageUrl: 'testUrl',
            projects: [
                {
                    title: 'testT',
                    description: 'testDes',
                    owner: 'testD',
                    whitelistedWallets: [
                        'TEST1mzfast77foodju5fluc66v6cv32ezgun0firean0nx5a',
                        'TESTcesecuritym9ju5fluc66v6cfasionv32ezpc7hr5ugan0nx5a'
                    ]
                }
            ]
        }

        database.collection('Users2').insertOne(newUser, (error, result) => {
            if (error) {
                response.status(500).json('Error occurred while adding the project.')
            } else {
                response.status(200).json('Added Successfully')
                console.log(result)
                console.log(result.acknowledged)
                console.log(result.insertedId)
            }
        })
    })
})



app.delete('/api/supafire/deleteProject', (request, response) => {
    const projectId = request.query.id // Retrieve the 'id' query parameter

    database.collection('projects').deleteOne(
        {
            projectId: projectId
        },
        (error, result) => {
            if (error) {
                response.status(500).json('Error occurred while deleting the project.')
            } else {
                response.status(200).json('Deleted Successfully')
            }
        }
    )
})

app.listen(5040, () => {
    Mongoclient.connect(uri, (error, client) => {
        if (error) {
            console.error('Mongo DB Connection Error:', error)
        } else {
            database = client.db(DATABASENAME)
            console.log('Mongo DB Connection Successful')
        }
    })
})

// node api.js
