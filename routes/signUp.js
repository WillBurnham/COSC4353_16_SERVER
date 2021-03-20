var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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

router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Enter valid Emai")
      .isLength({ max: 25 })
      .withMessage("max length is 25"),
    body("password").isLength({ min: 4 }).withMessage("Minimum 4 Characters"),
  ],
  async (req, res, next) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    try {
      //   const hashedPassword = await bcrypt.hash(req.body.email, 10);
      const user = users.find((user) => user.email == req.body.email);

      //user existst ==> can't create account
      if (user != null) {
        return res.status(400).json({ errors: "Account already exists" });
      } else {
        new_user = {
          id: Date.now().toString(),
          email: req.body.email,
          password: req.body.password,
        };
        users.push(user);
        const accessToken = jwt.sign({ email: req.body.email }, "shhhh");
        return res.status(200).json({ accessToken: accessToken });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
);

module.exports = router;
