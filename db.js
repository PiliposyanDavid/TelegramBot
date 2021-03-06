const mongoose = require('mongoose');
const Promise = require('bluebird');
const {asValue} = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    mongoose.Promise = Promise;

    const dbConnectionString = process.env.MONGODB_URI || "mongodb://localhost:27020/mydb";

    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    };

    mongoose.connect(dbConnectionString, connectionOptions);
    // mongoose.set('debug', true);

    // require('./models/jokes');
    // require('./models/chats');
    // require('./models/to_reviewed_jokes');

    const models = {
        jokes: require('./models/jokes'),
        chats: require('./models/chats'),
        stopped_chats: require('./models/stopped_chats'),
        to_reviewed_jokes: require('./models/to_reviewed_jokes')
    };

    container.register('db', asValue(models));
}

module.exports = dbBootstrap;
