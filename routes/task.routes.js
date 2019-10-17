var express = require('express');
var router = express.Router();
const path = require('path');
var multer = require('multer');
const Task = require('../models/task.model');
const User = require('../models/user.model');
const tasks = require('../controllers/task.controller')

const storage = require('multer-gridfs-storage')({
  url: 'mongodb://localhost:27017/kb-db',
  file: (req, file) => {
    return {
      filename: req.body.name + path.extname(file.originalname)
    };
  }
});

var upload = multer({
  storage: storage
})

const sUpload = upload.single('imageupload');

// Create task
router.post('/', sUpload, tasks.create)

// Fetch all tasks
router.get('/tasks', tasks.findAll);

// Fetch tasks by userId
router.get('/tasks/:userId', tasks.findByUser);

// Fetch state of a task by _id
router.get('/task-state/:_id', tasks.findBy);

module.exports = router;
