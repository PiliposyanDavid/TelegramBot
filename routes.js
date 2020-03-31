function bootstrapRoutes(app, container) {
    const exampleCtrl = container.resolve('exampleCtrl');
    const botMainCtrl = container.resolve('botMainCtrl');
    const jokesCtrl = container.resolve('jokesCtrl');

    app.get('/', exampleCtrl.example);
    app.get('/health-check', (req, res) => res.send({status: "success"}));

    app.post('/', botMainCtrl.handleMessages);
    app.get('/init', botMainCtrl.init);

    app.post('/jokes', jokesCtrl.add);
    app.get('/jokes/random', jokesCtrl.getRandom);
}

module.exports = bootstrapRoutes;
