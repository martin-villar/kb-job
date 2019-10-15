const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);


describe("tasks", function () {

    describe("CREATE TASK", function () {

        var task = {
            "name": "task121212",
        }
        it("Should creata a task in DB", (done) => {
            chai.request('http://localhost:3000')
                .post("/tasks/")
                .send(task)
                .end((err, res) => {
                    res.should.have.status(200);
                    // console.log("Response Body:", res.body);
                    done();
                })
        })
    })

    describe("FIND ALL", function () {
        it("Should fetch all tasks", (done) => {
            chai.request('http://localhost:3000')
                .get("/tasks/")
                .end((err, result) => {
                    result.should.have.status(200);
                    // console.log("Result Body:", result.body);
                    done();
                })
        })
    })
})
