function bootstrapRoutes(app, container) {
    const botMainCtrl = container.resolve('botMainCtrl');
    const jokesCtrl = container.resolve('jokesCtrl');

    app.get('/health-check', (req, res) => res.send({status: "success"}));

    app.post('/', botMainCtrl.handleMessages);
    app.get('/init', botMainCtrl.init);

    app.get('/job/init', botMainCtrl.initJob);
    app.get('/job/start', botMainCtrl.startJob);
    app.get('/job/stop', botMainCtrl.stopJob);

    app.post('/jokes', jokesCtrl.add);
    app.get('/jokes/random', jokesCtrl.getRandom);
}

module.exports = bootstrapRoutes;
