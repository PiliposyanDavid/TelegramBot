class StoppedChatsDao {
    constructor(db) {
        this.db = db;
    }

    create(chatId, firstName, lastName, userId, username, messages, readedJokesIds, over18) {
        return this.getCollection().create({
            chat_id: chatId,
            first_name: firstName,
            last_name: lastName,
            messages: messages,
            user_id: userId,
            username: username,
            readed_jokes_ids: readedJokesIds,
            over_18: over18
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

    deleteByUserId(userId) {
        return this.getCollection().remove({user_id: userId});
    }

    getCollection() {
        return this.db.stopped_chats;
    }
}

module.exports = StoppedChatsDao;
