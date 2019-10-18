
const chai = require("chai");
const chaiHttp = require("chai-http");
const Task = require('../models/task.model')

chai.use(chaiHttp);


describe("tasks", function () {

    describe("FETCH TASK STATE", function () {
        let task = {
            "_id": "5da909b3e8797e05181c4989"
        }
        it("Should fetch all tasks", (done) => {
            chai.request('http://localhost:3000')
                .get("/task-state/" + task._id)
                .end((err, result) => {
                    result.should.have.status(200);
                    console.log("Result Body:", result.body);
                    done();
                })
        })
    })

    describe("FETCH TASK RESULTS", function () {
        let task = {
            "_id": "5da909b3e8797e05181c4989"
        }
        it("Should fetch all tasks", (done) => {
            chai.request('http://localhost:3000')
                .get("/task-state/" + task._id)
                .end((err, result) => {
                    result.should.have.status(200);
                    console.log("Result Body:", result.body);
                    done();
                })
        })
    })

    describe("FIND TASK BY ID", function () {
        let task = {
            "_id": "5da5af5ed307911f48a2e216",
        }
        it("Should fetch all tasks", (done) => {
            chai.request('http://localhost:3000')
                .get("/tasks/" + task._id)
                .end((err, result) => {
                    result.should.have.status(200);
                    console.log("Result Body:", result.body);
                    done();
                })
        })
    })

    describe("CREATE TASK", function () {
        var task = {
            "_id": "5da5af5ed307911f48a2e216",
            'name': 'req.file.originalname',
            'userId': 'req.body.userId',
            'size': '1000',
            'fileID': 'req.file.id',
        }
        it("Should creata a task in DB", async(done) => {
            chai.request('http://localhost:3000')
                .post("/tasks/")
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })
})
