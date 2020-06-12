class ChatsDao {
    constructor(db) {
        this.db = db;
    }

    create(chatId, firstName, lastName, userId, username) {
        return this.getCollection().create({
            chat_id: chatId,
            first_name: firstName,
            last_name: lastName,
            messages: ["/start"],
            user_id: userId,
            username: username
        });
    }

    findChatByUserId(userId) {
        return this.getCollection().findOne({user_id: userId});
    }

    findChatByChatId(chatId) {
        return this.getCollection().findOne({chat_id: chatId});
    }

    findAllChats() {
        return this.getCollection().find().lean().exec();
    }

    findChats(offset = 0, limit = 60) {
        return this.getCollection().find({})
            .skip(offset)
            .limit(limit)
            .lean()
            .exec();
    }

    findAllOver18Chats() {
        return this.getCollection().find({over_18: true}).lean().exec();
    }

    findChatsCount(over18 = false) {
        return this.getCollection().count({over_18: over18})
    }

    addMessage(chatId, message) {
        return this.getCollection().findOneAndUpdate({chat_id: chatId}, {$push: {messages: message}});
    }

    updateUserOver18(chatId, isOver18) {
        return this.getCollection().findOneAndUpdate({chat_id: chatId}, {$set: {over_18: isOver18}});
    }

    addReadedJokeId(userId, jokeId) {
        return this.getCollection().findOneAndUpdate({user_id: userId}, {$addToSet: {readed_jokes_ids: jokeId}});
    }

    addUnreadJokeId(userId, jokeId) {
        return this.getCollection().findOneAndUpdate({user_id: userId}, {$addToSet: {unread_jokes_ids: jokeId}});
    }

    deleteByUserId(userId) {
        return this.getCollection().remove({user_id: userId});
    }

    getCollection() {
        return this.db.chats;
    }
}

module.exports = ChatsDao;
