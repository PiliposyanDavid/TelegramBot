const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swaggerDef');

module.exports = function (app) {
    const options = {
        swaggerDefinition,
        apis: ['./controllers/**/*.js'],
    };
    const swaggerSpec = swaggerJSDoc(options);

    const basicAuth = require('express-basic-auth');
    const swaggerUIOptions = {
        customCss: '.swagger-ui .topbar { display: none }'
    };
    app.use('/api-docs/',
        basicAuth({
            users: { template: 'template' },
            challenge: true,
            realm: 'QttqSSNBzbcD9hwh'
        }),
        swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUIOptions));
};
