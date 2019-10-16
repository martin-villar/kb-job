const mongoose = require('mongoose');

let results = new mongoose.Schema({
    processTime: Number,
    randomNumber: Number,
}, {_id: false});

let TaskSchema = mongoose.Schema({
    name: String,
    userId: String,
    completed: Boolean,
    results: results,
    size: Number,
    fileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs' //created by multer gridfs storage
    },
});

module.exports = mongoose.model('Tasks', TaskSchema);
