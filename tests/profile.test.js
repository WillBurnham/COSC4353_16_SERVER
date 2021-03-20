const profile = require("../routes/profile");
const bodyParser = require("body-parser");
const request = require("supertest");
const express = require("express");
const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", profile);

describe("POST /profile", function () {
  // it("responds with json", function (done) {
  //   request(app)
  //     .post("/")
  //     .auth(
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwNTEwNH0.uBnwjRdPdaT1p-xmJVfwSfe2HAF4NYvnnv6YgIaN020",
  //       { type: "bearer" }
  //     )
  //     .send({
  //       full_name: "John Miller",
  //       address_one: "pass4",
  //       city: "Houston",
  //       state: "TX",
  //       zip_code: "77024",
  //     })
  //     .expect(200)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       return done();
  //     });
  // });

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
});
