const awilix = require('@shahen.poghosyan/awilix');
const {asValue, asClass, Lifetime} = awilix;
const settings = require('./settings');

function bootstrap() {
    const container = awilix.createContainer({
        injectionMode: awilix.InjectionMode.CLASSIC
    });

    container.loadModules([
        './modules/**/*.js',
        './controllers/**/*.js',
        './dao/**/*.js',
        './routes.js'
    ], {
        formatName: 'camelCase',
        resolverOptions: {
            lifetime: Lifetime.SINGLETON
        }
    });
    container.register('settings', asValue(settings));

    return container;
}

module.exports = bootstrap;
