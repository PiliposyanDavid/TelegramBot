const assert = require('assert');
const logger = require('log4js').getLogger('ChatsService.srv');

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

    updateUserOver18(chatId, isOver18) {
        assert(chatId, "chatId missed");

        isOver18 = !!isOver18;
        return this.chatsDao.updateUserOver18(chatId, isOver18);
    }

    getAllOver18Chats() {
        return this.chatsDao.findAllOver18Chats();
    }

    getChatByUserId(userId) {
        assert(userId, "userId missed");

        return this.chatsDao.findChatByUserId(userId)
    }

    getChatByChatId(chatId) {
        assert(chatId, "chatId missed");

        return this.chatsDao.findChatByChatId(chatId)
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

    removeChatByUserId(userId) {
        assert(userId, "userId missed");
        return this.chatsDao.deleteByUserId(userId);
    }

    async getMessagesByChatId(chatId) {
        const chat = await this.chatsDao.findChatByChatId(chatId);
        if (!chat) return;
        let messages = "";
        chat.messages.forEach(msg => {
            if (msg.includes("From our - ")) {
                msg = msg.replace("From our - ", "We - ");
            } else msg = "Our - " + msg;
            messages = messages + (msg + "\n");
        });

        return messages;
    }

    async getUserInfoByUserId(userId) {
        const chat = await this.chatsDao.findChatByChatId(userId);
        if (!chat) return;

        return {
            messages: chat.messages,
            created: chat.created,
            updated: chat.updated,
            over18: chat.over_18,
            lastName: chat.last_name,
            firstName: chat.first_name,
            username: chat.username,
            chatId: chat.chat_id,
            userId: chat.user_id
        };
    }
}

module.exports = ChatsService;
