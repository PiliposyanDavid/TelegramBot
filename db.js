const mongoose = require('mongoose');
const { asValue } = require('@shahen.poghosyan/awilix');

async function dbBootstrap(container) {
    const dbConnectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/TEMPLATE';

    const connectionOptions = {
        autoIndex: false,
        readPreference: 'secondaryPreferred',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000
    };

    const db = mongoose.createConnection(dbConnectionString, connectionOptions);

    require('./models/example-model');

    const models = {
        example: db.model('example')
    };

    container.register('db', asValue(db));
    container.register('models', asValue(models));
}

module.exports = dbBootstrap;
