const mongoose = require('mongoose');
const {Schema} = mongoose;

const Chats = new Schema({
    messages: {type: []},
    last_name: {type: String},
    first_name: {type: String},
    username: {type: String},
    chat_id: {type: Number, index: true, unique: true},
    user_id: {type: Number, index: true, unique: true},
    readed_jokes_ids: {type: [], default: [], index: true},
    unread_jokes_ids: {type: [], default: [], index: true},
    created: {type: Date, default: Date.now()},
    updated: {type: Date, default: Date.now()},
    over_18: {type: Boolean, index: true, default: false}
});

module.exports = mongoose.model('chats', Chats);
