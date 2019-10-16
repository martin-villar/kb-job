const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.js');
var index = require('./routes/task.routes');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', index);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// require('./task.routes.js')(app);

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('MongoDB connection error, process will exit...', err);
    process.exit();
});

// Turn server on
app.listen(config.serverport, () => {
    console.log('Server listening, port: ', config.serverport);
});

app.get('/', function(req, res, next) {
    res.render('index');
});


