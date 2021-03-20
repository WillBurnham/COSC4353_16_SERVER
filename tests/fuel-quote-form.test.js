const fuelQuoteForm = require('../routes/fuel-quote-form');

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", fuelQuoteForm);

describe('POST /fuel-quote-form', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/')
        .send({
            gallons: 0,
            date: "09-08-1997"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});
