const config = require('../config')
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const tasks = require('../controllers/task.controller')

const storage = require('multer-gridfs-storage')({
  url: config.url,
  file: (req, file) => {
    return {
      filename: req.body.name + path.extname(file.originalname)
    };
  }
});

const upload = multer({
  storage: storage,
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

// Fetch results of a task by _id
router.get('/task-results/:_id', tasks.fetchResults);

module.exports = router;
