class JokesDao {
    constructor(db) {
        this.db = db;
    }

    findUnreadJokeForUser(userId, over18 = false) {
        const query = {};
        if (!over18) {
            // if user not over 18 will be see only 18- jokes, if user over 18 will be see all jokes
            query.over_18 = false;
        }
        query.readed_user_ids = {$ne: userId};

        return this.getCollection()
            .findOne(query)
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
            .findOneAndUpdate({_id: jokeId}, {$addToSet: {readed_user_ids: userId}});
    }

    findJoke(id) {
        return this.getCollection()
            .findOne({_id: id})
            .sort({created: -1})
            .lean()
            .exec()
    }

    findRandomJoke() {
        return this.getCollection()
            .findOne()
            .sort({created: -1})
            .lean()
            .exec()
    }

    findJokes(offset = 0, limit = 60) {
        return this.getCollection()
            .find({}, {_id: 0, text: 1, over_18: 1, owner_id: 1})
            .sort({created: -1})
            .skip(offset)
            .limit(limit)
            .lean()
            .exec()
    }

    getCollection() {
        return this.db.jokes
    }

}

module.exports = JokesDao;
