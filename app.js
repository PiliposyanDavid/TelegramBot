const express = require('express');
const containerBootstrap = require('./container');
const apiDocs = require('./controllers/api-docs/api-docs');
const routes = require('./routes');
const dbBootstrap = require('./db');
const logger = require('log4js').getLogger('ENTRY.app');
const app = express();

// Prometheus middleware for app metrics
app.use(require('express-prometheus-middleware')({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5]
}));
app.use(require('body-parser').json({
    limit: 20 * 1024 * 1024, //20MB
    extended: true
}));

const port = +(process.env.PORT || 80);
app.listen(port, () => {
    logger.info(`Server listening on port ${port}!`);
});

process.on("unhandledRejection", (reason, promise) => {
    const logData = {
        error_type: 'unhandled_rejection',
        stack: reason.stack,
        message: reason.message
    };
    console.log(logData);
});

process.on('uncaughtException', (err) => {
    console.log({
        error_type: 'exception',
        error_message: err.message || err,
        stack: err.stack
    });
});

//Default Error handler
app.use((err, req, res, next) => {
    logger.error(err);
    res.status(500).send({
        status: 'error',
        message: 'something went wrong',
    });

    next();
});

require('./loggerConfig');
const container = containerBootstrap(app);
apiDocs(app);
dbBootstrap(container);
routes(app, container);
