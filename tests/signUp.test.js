const signUp = require("../routes/signUp");
const bodyParser = require("body-parser");
const request = require("supertest");
const express = require("express");
const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", signUp);

let rand = () => {
  return Math.floor(Math.random() * 100000);
}

describe("POST /signUp", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/")
      .send({
        email: rand().toString() + "@test.com",
        password: "password1",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 400 - Missing/invalid data", function (done) {
    request(app)
      .post("/")
      .send({
        email: "user4",
        password: "pass4",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 400 - Account Already exists", function (done) {
    request(app)
      .post("/")
      .send({
        email: "testuser123@test.com",
        password: "password1",
      })
      .expect(400)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
