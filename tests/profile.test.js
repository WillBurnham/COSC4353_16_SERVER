const profile = require("../routes/profile");
const bodyParser = require("body-parser");
const request = require("supertest");
const express = require("express");
const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", profile);

describe("POST /profile", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwODUwM30.ZATREDprnIMyC2H_4fPVrVmGOdQXzE2Ty0MYklGWKhA",
        { type: "bearer" }
      )
      .send({
        full_name: "John Miller",
        address_one: "123 main st",
        city: "Houston",
        address_two: "Apt 30",
        state: "TX",
        zip_code: "77024",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with json", function (done) {
    request(app)
      .post("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwODUwM30.ZATREDprnIMyC2H_4fPVrVmGOdQXzE2Ty0MYklGWKhA",
        { type: "bearer" }
      )
      .send({
        full_name: "John Miller",
        address_one: "123 Main st",
        city: "Houston",
        state: "TX",
        zip_code: "77024",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with mssing city", function (done) {
    request(app)
      .post("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwNTEwNH0.uBnwjRdPdaT1p-xmJVfwSfe2HAF4NYvnnv6YgIaN020",
        { type: "bearer" }
      )
      .send({
        full_name: "John Miller",
        address_one: "123 Main st",
        city: "Houston",
        zip_code: "77024",
      })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with json", function (done) {
    request(app)
      .get("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwNTEwNH0.uBnwjRdPdaT1p-xmJVfwSfe2HAF4NYvnnv6YgIaN020",
        { type: "bearer" }
      )
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with authentication failed", function (done) {
    request(app)
      .get("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwNTEwNH0.uBnwjRdPdaT1p-xmJVfwSfe2HAF4NYvnnv6YgIaN0203435",
        { type: "bearer" }
      )
      .expect(403)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 404 - profile not found", function (done) {
    request(app)
      .get("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI0QHRlc3Q0LmNvbSIsImlhdCI6MTYxNjIwODI5Mn0.quRMhMhAynARPhNdWdLK13bu_aLRv-dJVWLhueYtrhg",
        { type: "bearer" }
      )
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 401 No access token", function (done) {
    request(app)
      .get("/")
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
