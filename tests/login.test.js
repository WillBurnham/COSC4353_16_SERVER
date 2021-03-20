const login = require('../routes/login');
const bodyParser = require('body-parser');
const request = require("supertest");
const express = require("express");
const app = express();
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use("/", login);

describe('POST /login', function() {
    it('responds with json', function(done) {
      request(app)
        .post('/')
        .send({
            "email": "test1@test1.com",
            "password": "pass1"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
});