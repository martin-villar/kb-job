var express = require('express');
var router = express.Router();
const path = require('path');
var multer = require('multer');
const Task = require('../models/task.model');
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
  // console.log(req.file)
  const task = new Task({
    name: req.file.originalname,
    size: req.file.size,
    completed: false,
    fileID: req.file.id
  });
  task.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(res)
    res.json({
      "success": "true",
      "file" : req.file.originalname,
    });
  })
})

router.get('/tasks', tasks.findAll);

router.get('/tasks/:taskId', tasks.findOne);

module.exports = router;
