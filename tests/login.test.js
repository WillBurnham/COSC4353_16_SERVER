const login = require("../routes/login");
const bodyParser = require("body-parser");
const request = require("supertest");
const express = require("express");
const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", login);

describe("POST /login", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/")
      .send({
        email: "user1@test1.com",
        password: "pass1",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with account does not exist", function (done) {
    request(app)
      .post("/")
      .send({
        email: "user9@test9.com",
        password: "pass1",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with password fails!", function (done) {
    request(app)
      .post("/")
      .send({
        email: "user1@test1.com",
        password: "pass2",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 400 - Invalid data!", function (done) {
    request(app)
      .post("/")
      .send({
        email: "user1",
        password: "pass2",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
