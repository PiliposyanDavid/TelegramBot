const mongoose = require('mongoose');
const {Schema} = mongoose;

const Jokes = new Schema({
    created: {type: Date, default: Date.now()},
    text: {type: String},
    was_reading: {type: Boolean, default: false}
});

module.exports = mongoose.model('jokes', Jokes);
