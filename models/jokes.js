const mongoose = require('mongoose');
const {Schema} = mongoose;

const Jokes = new Schema({
    created: {type: Date, default: Date.now()},
    text: {type: String},
    readed_user_ids: {type: [], default: [], index: true},
    over_18: {type: Boolean, index: true},
    owner_id: {type: Number}
});

module.exports = mongoose.model('jokes', Jokes);
