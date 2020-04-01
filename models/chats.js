const mongoose = require('mongoose');
const {Schema} = mongoose;

const Chats = new Schema({
    messages: {type: []},
    last_name: {type: String},
    first_name: {type: String},
    chat_id: {type: Number, index: true, unique: true},
    user_id: {type: Number, index: true, unique: true}
});

module.exports = mongoose.model('chats', Chats);
