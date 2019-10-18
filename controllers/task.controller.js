const Task = require('../models/task.model');
const utils = require('../utils/taskSimulator');
const counter = require('../utils/counter');


// Fetch all Tasks from the database.
exports.findAll = (req, res) => {
    Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Something wrong while retrieving Tasks.'
        });
    });
};

// Fetch tasks by userId
exports.findByUser = (req, res) => {
    Task.find({userId : req.params.userId})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: 'Task not found'
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Task not found'
            });
        }
        return res.status(500).send({
            message: 'Something wrong while retrieving tasks'
        });
    });
};

// Fetch state of a task by _id
exports.findBy = (req, res) => {
    Task.find({_id : req.params._id})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found"
            });
        }
        let obj = {};
        obj.id = task[0]._id;
        obj.state = task[0].state
        res.json(obj);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found"
            });
        }
        return res.status(500).send({
            message: "Something wrong while retrieving task"
        });
    });
};

// Fetch results of a task by _id
exports.fetchResults = (req, res) => {
    Task.find({_id : req.params._id})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found"
            });
        }
        let obj = {};
        obj.id = task[0]._id;
        obj.jobTime = task[0].jobTime;
        obj.size = task[0].size;
        obj.name = task[0].name;
        obj.randNum = task[0].randNum;
        res.json(obj);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found"
            });
        }
        return res.status(500).send({
            message: "Something wrong while retrieving task"
        });
    });
};

// Create a task
exports.create = async (req, res) => {
    let rateLimited = counter.rateLimit();
    if(rateLimited) {
        res.status(500).json({
            'message': 'task limit exceeded, try again later',
        });
        return;
    }
    if(!req.file) {
        res.status(500).json({
            'message': 'file is required',
        });
        return;
    }
    if(!req.body.userId) {
        res.status(500).json({
            'message': 'userId is required',
        });
        return;
    }
    if(req.file.size > 5000  || req.file.size < 1000) {
        res.status(500).json({
            'message': 'file size not supported',
        });
        return;
    }
    if(req.file.mimetype !== 'text/plain') {
        res.status(500).json({
            'message': 'file type not supported',
        });
        return;
    }
    if (req.file) {
        const task = new Task({
            name: req.file.originalname,
            userId: req.body.userId,
            size: req.file.size,
            state: 'uploaded',
            fileID: req.file.id,
        });
        task.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
            res.status(200).send({
                'success': 'true',
                'file': req.file.originalname,
            });
            counter.incrementCounter();
        });
        // Process task:
        res.status(200);
        await utils.doJob(task);
    } else {
        res.status(500).json({
            message: 'error - no file selected'
        });
    }
}

// Update a task
exports.update = async (req, res) => {
    let taskId = req._id;
    let taskData = {
        name: req.name,
        userId: req.userId,
        size: req.size,
        state: 'completed',
        fileID: req.fileID,
        jobTime: req.jobTime,
        randNum: req.randNum,
    }
    try {
        await Task.update({_id: taskId}, taskData);
    } catch (error) {
        res.status(500).send({
            message: err.message || 'Something wrong while updating the tasks.'
        });
    }
}
