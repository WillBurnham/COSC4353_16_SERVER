var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
const authenticateToken = require("../authenticate");

//Login routes.

//Dummy data,
let profiles = [
  {
    email_fk: "user1@test1.com",
    full_name: "John Doe",
    address_one: "123 Main St",
    address_two: "APt. 30",
    city: "Houston",
    state: "TX",
    zipcode: "77024",
  },
];

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

//Create a profile
router.post(
  "/",
  [
    authenticateToken,
    body("email").isEmail(),
    body("full_name").notEmpty(),
    body("address_one").notEmpty(),
    body("state").notEmpty(),
    body("city").notEmpty(),
    body("zip_code").notEmpty(),
  ],
  (req, res, next) => {
    //validate on incoming data.
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    // Create a profile for that user.
    profile = {
      id: Date.now().toString(),
      full_name: req.body.full_name,
      address_one: req.body.address_one,
      address_two: req.body.address_two ? req.body.address_two : null,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcoe,
    };
    profile.push(profile);
    return res.send(200).json(profile);
  }
);

//Get profile
router.get("/", authenticateToken, (req, res, next) => {
  console.log(req.user);
  prof = profiles.filter((profile) => profile.email_fk == req.user.email);
  console.log(prof);
  if (prof.length == 0) {
    return res.sendStatus(404);
  }
  return res.send(200).json(prof[0]);
});

module.exports = router;
