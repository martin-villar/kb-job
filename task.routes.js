module.exports = (app) => {
    const tasks = require('./task.controller.js');

    // Create a new Task - i
    app.post('/tasks', tasks.create);

    // Fetch all tasks - ii
    app.get('/tasks', tasks.findAll);

    // Fetch a single task state with taskId - iii
    app.get('/tasks/:taskId', tasks.findOne);
}
