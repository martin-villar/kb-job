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
router.post('/', sUpload, (req, res, next) => {
  if(req.file) {
    const task = new Task({
      name: req.file.originalname,
      userId : req.body.userId,
      size: req.file.size,
      state: 'uploaded',
      fileID: req.file.id,
    });
    task.save(function (err) {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        "success": "true",
        "file" : req.file.originalname,
      });
    })
  }
  else{
    res.send({ message: 'error - no file selected' });
  }
})

// Fetch all tasks
router.get('/tasks', tasks.findAll);

// Fetch tasks by userId
router.get('/tasks/:userId', tasks.findByUser);

// Fetch state of a task by _id
router.get('/tasks-state/:_id', tasks.findBy);

module.exports = router;
