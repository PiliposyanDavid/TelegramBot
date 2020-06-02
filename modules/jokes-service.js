const assert = require('assert');

class JokesService {
    constructor(chatsService, jokesDao, toReviewedJokesDao) {
        this.chatsService = chatsService;
        this.jokesDao = jokesDao;
        this.toReviewedJokesDao = toReviewedJokesDao;
    }

    getJokeFromNonReadedForUserAndSorted(userId, over18) {
        return this.jokesDao.findUnreadJokeForUser(userId, over18);
    }

    getJoke(id) {
        assert(id, "id missed");
        return this.jokesDao.findJoke(id)
    }

    async addJoke(text, over18, ownerId) {
        assert(text, "text missed");

        const joke = await this.jokesDao.addJoke(text, over18, ownerId);
        let chats;
        if (over18) chats = await this.chatsService.getAllOver18Chats();
        else chats = await this.chatsService.getAllChats();

        if (!chats || !chats.length) return;

        for (const chat of chats) {
            await this.chatsService.addJokeIdToUnreadForUser(chat.user_id, joke._id);
        }
        return joke;
    }

    updateJokeReadedForUser(id, userId) {
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
