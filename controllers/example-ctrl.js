module.exports = function ExampleCtrl(exampleService) {
    this.example = example;

    /**
     * @swagger
     * /:
     *   get:
     *     summary: get user suggestions [search, contacts, z-score]
     *     description: Returns arrays of users as well an explanation, a metadata with a next page url
     *     responses:
     *       200:
     *         description: success response
     */
    function example(req, res) {
        res.send(exampleService.getExample());
    }
};
