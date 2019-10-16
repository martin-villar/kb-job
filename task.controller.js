const Task = require('./models/task.model');

//Create new Task
// exports.create = (req, res) => {
//     // Request validation
//     if(!req.body) {
//         return res.status(400).send({
//             message: "Task content can not be empty"
//         });
//     }

//     // Create a Task
//     const task = new Task({
//         name: req.body.name,
//         completed: false,
//     });

//     // Save Task in the database
//     task.save()
//     .then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while creating the Task."
//         });
//     });
// };

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving Tasks."
        });
    });
};

// Find a single Task with a TaskId
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Something wrong retrieving task with id " + req.params.taskId
        });
    });
};

