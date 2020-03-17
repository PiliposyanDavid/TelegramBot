class ExampleService {
    constructor(exampleRepository) {
        this.exampleRepository = exampleRepository;
    }

    getExample() {
        return this.exampleRepository.getExampleData();
    }
}

module.exports = ExampleService;
