const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: Number,
    tasks: []
});

module.exports = mongoose.model('User', UserSchema);


