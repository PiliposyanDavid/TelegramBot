function bootstrapRoutes(app, container) {
    const exampleCtrl = container.resolve('exampleCtrl');
    const botMainCtrl = container.resolve('botMainCtrl');

    app.get('/', exampleCtrl.example);
    app.get('/health-check', (req, res) => res.send({status: "success"}));

    app.post('/', botMainCtrl.handleMessages);
    app.get('/init', botMainCtrl.init);

}

module.exports = bootstrapRoutes;
