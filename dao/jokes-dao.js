class JokesDao {
    constructor(db) {
        this.db = db;
    }

    findJokeFromNonReadedAndSorted() {
        return this.getCollection()
            .findOne({was_reading: false})
            .sort({created: -1})
    }

    addJoke(text) {
        return this.getCollection()
            .create({was_reading: false, text: text, created: Date.now()});
    }

    updateJokeReaded(id) {
        return this.getCollection()
            .update({_id: id}, {$set: {was_reading: true}});
    }

    getCollection() {
        return this.db.jokes
    }

}

module.exports = JokesDao;
