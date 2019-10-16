const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
    tasks: []
});

module.exports = mongoose.model('User', UserSchema);


