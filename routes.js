function bootstrapRoutes(app, container) {
    const botDetectionMiddleware = container.resolve("checkIsBotMiddle");
    const botMainCtrl = container.resolve('botMainCtrl');
    const jokesCtrl = container.resolve('jokesCtrl');

    app.get('/health-check', (req, res) => res.send({status: "success"}));

    app.post('/', botDetectionMiddleware, botMainCtrl.handleMessages);
    // app.get('/init', botDetectionMiddleware, botMainCtrl.init);

    app.get('/job/start', botDetectionMiddleware, botMainCtrl.startJob);
    // app.get('/job/init', botDetectionMiddleware, botMainCtrl.initJob);
    // app.get('/job/stop', botDetectionMiddleware, botMainCtrl.stopJob);

    app.post('/jokes', botDetectionMiddleware, jokesCtrl.add);
    app.get('/jokes/random', botDetectionMiddleware, jokesCtrl.getRandom);
}

module.exports = bootstrapRoutes;
