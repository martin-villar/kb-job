const Task = require('../models/task.model');
const utils = require('../utils/taskSimulator');


// Create a task
exports.create = async (req, res) => {
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
            res.json({
                'success': 'true',
                'file': req.file.originalname,
            });
        });
        // Process task:
        await utils.doJob(task);
    } else {
        res.send({
            message: 'error - no file selected'
        });
    }
}

// Update a task
exports.update = async (req, res) => {
    console.log('will look fot task with _id', req);
    let taskId = req._id;
    if (taskId != undefined) {
        task = await Task.findById(taskId);
    }
    if (!taskId) {
        //res.status(404).json(new Errors.TaskNotFoundError());
    }
    let taskData = {
        name: req.name,
        userId: req.userId,
        size: 47680,
        state: 'completed',
        fileID: req.fileID,
        jobTime: 5617,
        randNum: 527850,
    }
    try {
        await Task.update({_id: taskId}, taskData);
    } catch (error) {
        throw error;
    }
}

// Retrieve all Tasks from the database.
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
                message: 'Task not found with id ' + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Task not found with id ' + req.params.taskId
            });
        }
        return res.status(500).send({
            message: 'Something wrong retrieving task with id ' + req.params.userId
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
            message: "Something wrong retrieving task"
        });
    });
};


