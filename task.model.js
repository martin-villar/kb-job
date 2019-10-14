const mongoose = require('mongoose');

let results = new mongoose.Schema({
    processTime: Number,
    randomNumber: Number
}, {_id: false});

let TaskSchema = mongoose.Schema({
    id: Number,
    name: String,
    state: Boolean,
    results: results
});

module.exports = mongoose.model('Tasks', TaskSchema);
