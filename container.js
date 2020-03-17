const awilix = require('@shahen.poghosyan/awilix');
const { Lifetime } = awilix;

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

    return container;
}

module.exports = bootstrap;
