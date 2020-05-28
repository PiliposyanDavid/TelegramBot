const mongoose = require('mongoose');
const {Schema} = mongoose;

const ToReviewedJokes = new Schema({
    created: {type: Date, default: Date.now()},
    text: {type: String},
    creator: {type: Number},
    chat_id: {type: Number},
});

module.exports = mongoose.model('to_reviewed_jokes', ToReviewedJokes);
