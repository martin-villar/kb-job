const express = require('express');
const app = express();
const config = require('./config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('MongoDB connection error, process will exit!', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({'message': 'CPU intensive API default route'});
});

// Turn server on
app.listen(config.serverport, () => {
    console.log('Server listening, port: ', config.serverport);
});
