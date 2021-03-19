var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");

//Login routes.

//Dummy data,
let users = [
  {
    email: "test1@test1.com",
    password: "pass1",
  },
  {
    email: "test2@test2.com",
    password: "pass2",
  },
  {
    email: "test3@test3.com",
    password: "pass3",
  },
];

//Login api
router.post("/", async (req, res, next) => {
  //validate on incoming data.

  //Check if user already exists and match the password.
  console.log(req.body);
  try {
    const user = users.find((user) => user.email == req.body.email);
    if (user == null) {
      console.log("Account does not exist");
      throw Error("Account Does not exist");
    }
    try {
      if (user.password == req.body.password) {
        res.status(200).send("Successful");
      } else {
        console.log("password fails!");
        throw Error("password fails!");
      }
    } catch {
      res.status(500).send();
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = router;
