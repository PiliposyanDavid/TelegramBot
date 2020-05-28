const mongoose = require('mongoose');
const Promise = require('bluebird');
const {asValue} = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    mongoose.Promise = Promise;

    const dbConnectionString = process.env.MONGODB_URI;

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

    require('./models/jokes');
    require('./models/chats');

    const models = {
        jokes: require('./models/jokes'),
        chats: require('./models/chats'),
        to_reviewed_jokes: require('/models/jokes')
    };

    console.log("connection stat", mongoose.connection.readyState);
    console.log("connection uri", dbConnectionString);

    // container.register('db', asValue(db));
    container.register('db', asValue(models));
}

module.exports = dbBootstrap;
