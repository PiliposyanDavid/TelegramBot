const assert = require('assert');

class JokesService {
    constructor(jokesDao) {
        this.jokesDao = jokesDao;
    }

    getJokeFromNonReadedAndSorted() {
        return this.jokesDao.findJokeFromNonReadedAndSorted();
    }

    addJoke(text) {
        assert(text, "text missed");

        return this.jokesDao.addJoke(text);
    }

    updateJokeReaded(id) {
        assert(id, "id missed");

        return this.jokesDao.updateJokeReaded(id);
    }
}

module.exports = JokesService;
