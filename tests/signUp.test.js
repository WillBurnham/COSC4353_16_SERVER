const signUp = require("../routes/signUp");
const bodyParser = require("body-parser");
const request = require("supertest");
const express = require("express");
const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", signUp);

describe("POST /signUp", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/")
      .send({
        email: "user4@test4.com",
        password: "pass4",
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
