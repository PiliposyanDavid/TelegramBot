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

    findAllChats() {
        return this.getCollection().find().lean().exec();
    }

    findAllOver18Chats() {
        return this.getCollection().find({over_18: true}).lean().exec();
    }

    addMessage(chatId, message) {
        return this.getCollection().update({chat_id: chatId}, {$push: {messages: message}});
    }

    addReadedJokeId(userId, jokeId) {
        return this.getCollection().update({user_id: userId}, {$addToSet: {readed_jokes_ids: jokeId}});
    }

    addUnreadJokeId(userId, jokeId) {
        return this.getCollection().update({user_id: userId}, {$addToSet: {unread_jokes_ids: jokeId}});
    }

    getCollection() {
        return this.db.chats;
    }
}

module.exports = ChatsDao;
