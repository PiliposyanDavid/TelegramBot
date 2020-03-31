const mongoose = require('mongoose');
const Promise = require('bluebird')
const {asValue} = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    mongoose.Promise = Promise;

    const dbConnectionString =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        process.env.MONGODB_URI ||
        "xuyevo";

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

    const db = mongoose.connect(dbConnectionString, connectionOptions);

    require('./models/jokes');
    require('./models/chats');

    const models = {
        jokes: db.model('jokes'),
        chats: db.model('chats')
    };

    console.log("connection stat", mongoose.connection.readyState);
    console.log("connection uri", dbConnectionString);

    container.register('db', asValue(db));
    container.register('models', asValue(models));
}

module.exports = dbBootstrap;
