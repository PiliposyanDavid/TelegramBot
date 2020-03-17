const mongoose = require('mongoose');
const { Schema } = mongoose;

const Example = new Schema({
    device_id: { type: String },
});

module.exports = mongoose.model('example', Example);
