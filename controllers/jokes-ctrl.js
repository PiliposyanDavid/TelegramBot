module.exports = function JokesCtrl(jokesService) {
    this.add = add;
    this.getRandom = getRandom;

    async function add(req, res) {
        const text = req.body.text;
        if (!text) return res.send({status: "error", message: "invalid text"});

        await jokesService.addJoke(text);

        return res.send({status: "success"})
    }

    async function getRandom(req, res) {
        const joke = await jokesService.getJokeFromNonReadedAndSorted();

        return res.send({status: "success", response: joke})
    }
};
