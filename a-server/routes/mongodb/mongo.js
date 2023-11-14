const router = require('express').Router()

// var MongoClient = require('mongodb').MongoClient
// const { MongoClient } = require("mongodb");
const { MongoClient, ServerApiVersion } = require('mongodb')

const multer = require('multer')
const { ObjectId } = require('mongodb')

const username = encodeURIComponent('Driss')
const password = encodeURIComponent('IP.ic@tc0sp')
const cluster = 'cluster0.pesps5y.mongodb.net' // The cluster name or hostname
const authSource = 'admin' // The authentication source
const authMechanism = 'SCRAM-SHA-1' // The authentication mechanism

// Conncetion string of mongodb
const uri = `mongodb+srv://${username}:${password}@${cluster}/${authSource}?retryWrites=true&w=majority&authMechanism=${authMechanism}`

var DATABASENAME = 'supafire'
var database

// MongoClient.connect(uri, (error, client) => {
//     if (error) {
//         console.error('Mongo DB Connection Error:', error)
//     } else {
//         database = client.db(DATABASENAME)
//         console.log('Mongo DB Connection Successful')
//     }
// })

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect()
        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 })
        console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close()
    }
}
run().catch(console.dir)

// Middleware to check if the database is initialized
const ensureDatabaseMiddleware = (req, res, next) => {
    if (!database) {
        res.status(500).json('Database not initialized')
    } else {
        next()
    }
}

router.use(ensureDatabaseMiddleware)

// * * * * * Route to get projects for a specific user
router.get('/api/supafire/getProjects/:userId', (request, response) => {
    console.log('Request received for getProjects route')
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

// * * * * * Route to get all projects
router.get('/api/supafire/projects', (request, response) => {
    console.log('Request received for getProjects route')
    database
        .collection('projects')
        .find({})
        .toArray((error, result) => {
            response.send(result)
        })
})

module.exports = router

// Export a function that takes the Express app instance as a parameter
// module.exports = (app) => {
//     // Connect to MongoDB before starting the Express app
//     Mongoclient.connect(uri, (error, client) => {
//         if (error) {
//             console.error('Mongo DB Connection Error:', error)
//         } else {
//             database = client.db(DATABASENAME)
//             console.log('Mongo DB Connection Successful')

//             // Use the defined router in your Express app
//             app.use('/goesdb', router)

//             // Start the Express app after MongoDB connection is established
//             // app.listen(3020, () => {
//             //     console.log('Express app listening on port 3020')
//             // })
//         }
//     })
// }
