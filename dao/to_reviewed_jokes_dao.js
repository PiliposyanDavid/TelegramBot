class ToReviewedJokes {
    constructor(db) {
        this.db = db;
    }

    addJoke(text, userId, chatId) {
        return this.getCollection()
            .create({user_id: userId, chat_id: chatId, text: text, created: Date.now()});
    }


    getCollection() {
        return this.db.to_reviewed_jokes
    }

}

module.exports = ToReviewedJokes;
