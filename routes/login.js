var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var db = require("../database.js");

//Login routes.

//Dummy data,
let users = [
  {
    email: "user1@test1.com",
    password: "pass1",
  },
  {
    email: "user2@test2.com",
    password: "pass2",
  },
  {
    email: "user3@test3.com",
    password: "pass3",
  },
];

const binary_to_text = (str) => {
  return str
    .split(" ")
    .map(function (elem) {
      return String.fromCharCode(parseInt(elem, 2));
    })
    .join("");
};

//Login api
router.post(
  "/",
  [
    body("email").isEmail().isLength({ max: 25 }),
    body("password").isLength({ min: 4 }),
  ],
  async (req, res, next) => {
    //validate on incoming data.
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    //Check if user already exists and match the password.

    //Get matching user from database
    let user = [];
    const email = req.body.email;

    db.query(
      "SELECT * FROM Users WHERE email = ? ",
      [email],
      (err, results) => {
        if (err) throw err;
        user = JSON.parse(JSON.stringify(results));
        if (user.length == 0) {
          return res.status(400).json({ error: "Account does not exist" });
        }
        console.log(user[0]);
        let hash = user[0].password;
        let password = req.body.password;
        // console.log(String.fromCharCode(binaryPass));
        // console.log(hashedPassword);
        bcrypt.compare(password, hash, (err, response) => {
          if (response == true) {
            const accessToken = jwt.sign(
              { email: req.body.email, password: hash },
              "shhhh"
            );
            res
              .status(200)
              .json({ accessToken: accessToken, user_id: user[0].user_id });
          } else {
            return res.status(400).json({ error: "Wrong Password" });
          }
        });
      }
    );
  }
);

module.exports = router;
