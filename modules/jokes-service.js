const assert = require('assert');

class JokesService {
    constructor(chatsService, mainBotService, settings, jokesDao, toReviewedJokesDao) {
        this.chatsService = chatsService;
        this.mainBotService = mainBotService;
        this.settings = settings;
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

    getRandomJoke() {
        return this.jokesDao.findRandomJoke(id)
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

    async approveReviewedJoke(id, over18) {
        assert(id, "id missed");

        const reviewedJoke = await this.toReviewedJokesDao.findJokeById(id);
        await this.addJoke(reviewedJoke.text, over18, reviewedJoke.user_id);
        const chat = await this.chatsService.getChatByChatId(reviewedJoke.chat_id);

        await this.mainBotService.sendMessageToChat(reviewedJoke.chat_id, this.settings.approve_joke_message(chat.first_name, reviewedJoke.text))

    }
}

module.exports = JokesService;
