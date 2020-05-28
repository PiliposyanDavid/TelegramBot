const assert = require('assert');

class JokesService {
    constructor(jokesDao, toReviewedJokesDao) {
        this.jokesDao = jokesDao;
        this.toReviewedJokesDao = toReviewedJokesDao;
    }

    getJokeFromNonReadedAndSorted(userId, over18) {
        return this.jokesDao.findUnreadJokeForChat(userId, over18);
    }

    getJoke(id) {
        assert(id, "id missed");
        return this.jokesDao.findJoke(id)
    }

    addJoke(text, over18) {
        assert(text, "text missed");
        assert(over18, " over18 missed");

        return this.jokesDao.addJoke(text, over18);
    }

    updateJokeReaded(id, userId) {
        assert(id, "id missed");
        assert(userId, "userId missed");

        return this.jokesDao.updateJokeReadedForUser(id, userId);
    }

    addJokeToReviewedJokesList(text, userId, chatId) {
        assert(text, "text missed");
        assert(userId, "userId missed");
        assert(chatId, "chatId missed");

        return this.toReviewedJokesDao.addJoke(text, userId, chatId);
    }
}

module.exports = JokesService;
