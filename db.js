const mongoose = require('mongoose');
const {asValue} = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    const dbConnectionString = "mongodb://heroku_zr0p08s0:4as6v9ahc4kp2dbahs7qrdmrpa@ds219983.mlab.com:19983/heroku_zr0p08s0";

    const connectionOptions = {
        autoIndex: false,
        readPreference: 'secondaryPreferred',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000
    };

    const db = mongoose.createConnection(dbConnectionString, connectionOptions);

    require('./models/jokes');
    require('./models/chats');

    const models = {
        jokes: db.model('jokes'),
        chats: db.model('chats')
    };

    console.log("connection stat", mongoose.connection.readyState);

    container.register('db', asValue(db));
    container.register('models', asValue(models));
}

module.exports = dbBootstrap;
