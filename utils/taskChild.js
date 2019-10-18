const task = require('../controllers/task.controller');
const utils = require('./taskSimulator');

(async function() {
    let job = JSON.parse(process.argv[2]);
    job.jobTime = utils.getRandonNum(15000, 5000);
    job.randNum = utils.getRandonNum(1000000, 0);
    await utils.sleep(job.jobTime);
    await task.update(job);
    console.log(`finished whith ${job} after ${job.jobTime}`)
    process.exit();
})()
