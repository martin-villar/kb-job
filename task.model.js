const mongoose = require('mongoose');

let results = new mongoose.Schema({
    processTime: Number,
    randomNumber: Number
}, {_id: false});

let TaskSchema = mongoose.Schema({
    name: String,
    completed: Boolean,
    results: results
});

module.exports = mongoose.model('Tasks', TaskSchema);
