const fuelQuoteForm = require("../routes/fuel-quote-form");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", fuelQuoteForm);

describe("POST /fuel-quote-form", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwODUwM30.ZATREDprnIMyC2H_4fPVrVmGOdQXzE2Ty0MYklGWKhA",
        { type: "bearer" }
      )
      .send({
        gallons: "10000",
        date: Date.now().toString(),
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it("responds with 404 - User does not exist", function (done) {
    request(app)
      .post("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQHRlc3QzLmNvbSIsImlhdCI6MTYxNjIxNDIxMH0.F_0klMaYvZW-d38TUG0rLn6c_cFl2GTa9-_ufWu4UNc",
        { type: "bearer" }
      )
      .send({
        gallons: "10000",
        date: Date.now().toString(),
      })
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /fuel-quote-form", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQHRlc3QxLmNvbSIsImlhdCI6MTYxNjIwODUwM30.ZATREDprnIMyC2H_4fPVrVmGOdQXzE2Ty0MYklGWKhA",
        { type: "bearer" }
      )
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 404 - No entries", function (done) {
    request(app)
      .get("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQHRlc3QyLmNvbSIsImlhdCI6MTYxNjIxNDA5NH0.j2eveUjc9zLOZ7gZTkv6WopLMuIhKIKK_4D9QXFzQJs",
        { type: "bearer" }
      )
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("responds with 404", function (done) {
    request(app)
      .get("/")
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQHRlc3QzLmNvbSIsImlhdCI6MTYxNjIxNDIxMH0.F_0klMaYvZW-d38TUG0rLn6c_cFl2GTa9-_ufWu4UNc",
        { type: "bearer" }
      )
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
