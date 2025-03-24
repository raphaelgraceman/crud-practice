const dotenv = require('dotenv');
dotenv.config();//An instance of dotenv method
//import mongoClient and require its instance of method
const MongoClient = require('mongodb').MongoClient;

//create a variable to hold the database
let database;

//set up a function to initialize the database
const initDb = (callback) => {
    if (database) {//If database exist
        console.log("Database is already initialized");
        return callback(null, database);
    }
    //else connect to mongodb url and then return the request of the client or return error
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch ((err) => {
            callback(err);
        })
};


//get the database if initialized successfully
const getDatabase = () => {
    if (!database) {
        throw Error('No Database initialized')
    }
    return database;
};

//Export the functions
module.exports = {
    initDb, getDatabase
};