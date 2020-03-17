class ExampleRepository {
    constructor(db) {
        this.db = db;
    }

    getExampleData() {
        return 'Hello world';
    }
}

module.exports = ExampleRepository;
