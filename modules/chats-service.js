const assert = require('assert');

class ChatsService {
    constructor(chatsDao) {
        this.chatsDao = chatsDao;
    }

    async createIfNotExists(chatId, firstName, lastName, userId) {
        assert(chatId, "chatId missed");
        assert(userId, "userId missed");
        assert(lastName, "lastName missed");
        assert(firstName, "firstName missed");

        const chat = await this.chatsDao.findChatByUserId(userId);
        if (chat) return chat;

        return this.chatsDao.create(chatId, firstName, lastName, userId);
    }

    getAllChats() {
        return this.chatsDao.findAllChats();
    }


    addMessage(chatId, message) {
        assert(chatId, "chatId missed");
        assert(message, "message missed");

        return this.chatsDao.addMessage(chatId, message);
    }
}

module.exports = ChatsService;
