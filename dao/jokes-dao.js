class JokesDao {
    constructor(db) {
        this.db = db;
    }

    findUnreadJokeForUser(userId, over18 = false) {
        return this.getCollection()
            .findOne({over_18: over18, readed_user_ids: {$nin: [userId]}})
            .sort({created: -1})
            .lean()
            .exec()
    }

    addJoke(text, over18, ownerId) {
        return this.getCollection()
            .create({over_18: over18, text: text, owner_id: ownerId, created: Date.now()});
    }

    updateJokeReadedForUser(jokeId, userId) {
        return this.getCollection()
            .update({_id: jokeId}, {$addToSet: {readed_user_ids: userId}});
    }

    findJoke(id) {
        return this.getCollection()
            .findOne({_id: id})
            .sort({created: -1})
            .lean()
            .exec()
    }

    findRandomJoke(id) {
        return this.getCollection()
            .findOne()
            .sort({created: -1})
            .lean()
            .exec()
    }

    getCollection() {
        return this.db.jokes
    }

}

module.exports = JokesDao;
