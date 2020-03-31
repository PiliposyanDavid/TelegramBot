const mongoose = require('mongoose');
const {asValue} = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    const dbConnectionString = "mongodb://david3ngeener:032dp333@ds219983.mlab.com:19983/heroku_zr0p08s0";

    const connectionOptions = {
    };

    const db = mongoose.createConnection(dbConnectionString, connectionOptions);

    require('./models/jokes');
    require('./models/chats');

    const models = {
        jokes: db.model('jokes'),
        chats: db.model('chats')
    };

    container.register('db', asValue(db));
    container.register('models', asValue(models));
}

module.exports = dbBootstrap;
