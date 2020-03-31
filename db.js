const mongoose = require('mongoose');
const {asValue} = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    const dbConnectionString = process.env.MONGODB_URI || "xuyevo";

    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    const db = mongoose.createConnection(dbConnectionString, connectionOptions);

    require('./models/jokes');
    require('./models/chats');

    const models = {
        jokes: db.model('jokes'),
        chats: db.model('chats')
    };

    console.log("connection stat", mongoose.connection.readyState);
    console.log("connection uri", dbConnectionString);
    console.log("db", db);

    container.register('db', asValue(db));
    container.register('models', asValue(models));
}

module.exports = dbBootstrap;
