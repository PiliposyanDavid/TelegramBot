class ChatsDao {
    constructor(db) {
        this.db = db;
    }

    create(chatId, firstName, lastName, userId) {
        console.log("db", this.db);
        console.log("collection", this.getCollection());

        return this.getCollection().create({
            chat_id: chatId,
            first_name: firstName,
            last_name: lastName,
            messages: ["/start"],
            user_id: userId
        });
    }

    findAllChats() {
        return this.getCollection().find();
    }

    addMessage(chatId, message) {
        return this.getCollection().update({chat_id: chatId}, {$push: {messages: message}});
    }

    getCollection() {
        return this.db.chats;
    }
}

module.exports = ChatsDao;
