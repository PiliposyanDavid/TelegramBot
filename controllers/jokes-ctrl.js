module.exports = function JokesCtrl(jokesService) {
    this.add = add;
    this.getRandom = getRandom;

    async function add(req, res) {
        const text = req.body.text;
        if (!text) return res.send({status: "error", message: "invalid text, specify text"});

        const over18 = !!req.body.over_18;
        await jokesService.addJoke(text, over18, 938812149);

        return res.send({status: "success"})
    }

    async function getRandom(req, res) {
        const joke = await jokesService.getRandomJoke();

        return res.send({status: "success", response: joke})
    }
};
