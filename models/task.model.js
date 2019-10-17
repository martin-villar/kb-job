const mongoose = require('mongoose');

let results = new mongoose.Schema({
    processTime: Number,
    randomNumber: Number,
}, {_id: false});

let TaskSchema = mongoose.Schema({
    name: String,
    userId: String,
    state: String,
    results: results,
    size: Number,
    jobTime: Number,
    randNum: Number,
    fileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs' //created by multer gridfs storage
    },
});

module.exports = mongoose.model('Tasks', TaskSchema);
