const task = require('../controllers/task.controller');

exports.sleep = function(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    }).catch(error => {
        console.log('error in sleep:', error.message);
    });
};

exports.getRandonNum = function(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.doJob = async function(job) {
    job.jobTime = this.getRandonNum(15000, 5000);
    job.randNum = this.getRandonNum(1000000, 0);
    await this.sleep(job.jobTime);
    task.update(job);
}
