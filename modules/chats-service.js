const logger = require('log4js').getLogger('ChatsService.srv');

const assert = require('assert');

class ChatsService {
    constructor(chatsDao) {
        this.chatsDao = chatsDao;
    }

    async createIfNotExists(chatId, firstName, lastName, userId, username) {
        assert(chatId, "chatId missed");
        assert(userId, "userId missed");
        assert(lastName, "lastName missed");
        assert(firstName, "firstName missed");

        const chat = await this.chatsDao.findChatByUserId(userId);
        if (chat) {
            return chat;
        }

        return this.chatsDao.create(chatId, firstName, lastName, userId, username);
    }

    getAllChats() {
        return this.chatsDao.findAllChats();
    }

    updateUserOver18(chatId,isOver18) {
        assert(chatId, "chatId missed");

        isOver18 = !!isOver18;
        return this.chatsDao.updateUserOver18(chatId,isOver18);
    }

    getAllOver18Chats() {
        return this.chatsDao.findAllOver18Chats();
    }

    getChatByUserId(userId) {
        assert(userId, "userId missed");

        return this.chatsDao.findChatByUserId(userId)
    }

    addJokeIdToReadedForUser(userId, jokeId) {
        assert(userId, "userId missed");
        assert(jokeId, "jokeId missed");

        return this.chatsDao.addReadedJokeId(userId, jokeId)
    }

    addJokeIdToUnreadForUser(userId, jokeId) {
        assert(userId, "userId missed");
        assert(jokeId, "jokeId missed");

        return this.chatsDao.addUnreadJokeId(userId, jokeId)
    }

    addMessage(chatId, message) {
        assert(chatId, "chatId missed");
        assert(message, "message missed");

        return this.chatsDao.addMessage(chatId, message);
    }
}

module.exports = ChatsService;
