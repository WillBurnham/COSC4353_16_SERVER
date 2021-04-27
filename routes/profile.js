var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
const authenticateToken = require("../authenticate");
const db = require("../database");

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
router.post("/", authenticateToken, (req, res, next) => {
  //validate on incoming data.
  const err = validationResult(req);
  console.log(err);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  } else {
    console.log(req.body);
    //Get user.
    let user = {};
    db.query(
      "SELECT * FROM Users WHERE email = ? ",
      [req.user.email],
      (err, results) => {
        console.log(results);
        user = JSON.parse(JSON.stringify(results))[0];
        // Create a profile for that user.
        profile = {
          user_id: user.user_id,
          full_name: req.body.full_name,
          address_one: req.body.address_one,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
        };

        if ("address_two" in req.body) {
          profile["address_two"] = req.body.address_two;
        }
        db.query("INSERT INTO profiles SET ? ", profile, (err, results) => {
          if (err) throw err;
          console.log(results);
          return res.status(200).json(profile);
        });
      }
    );
  }
});

//Get profile
router.get("/", authenticateToken, (req, res, next) => {
  console.log(req.user);
  //Get profile of the user
  db.query(
    "SELECT * FROM Users WHERE email = ? ",
    [req.user.email],
    (err, results) => {
      user = JSON.parse(JSON.stringify(results))[0];
      // Get profile based on user
      db.query(
        "SELECT * FROM profiles WHERE user_id = ? ",
        [user.user_id],
        (err, results) => {
          if (err) {
            return res.sendStatus(400);
          } else {
            rows = JSON.parse(JSON.stringify(results));
            if (rows.length > 0) {
              profile = rows[0];
              return res.send(profile);
            } else {
              return res.sendStatus(400);
            }
          }
        }
      );
    }
  );
});

//Update Profile
router.put("/", authenticateToken, (req, res, next) => {
  let updated_profile = {
    full_name: req.body.full_name,
    address_one: req.body.address_one,
    address_two: req.body.address_two,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
  };

  console.log("updated profile: ", updated_profile);

  db.query(
    "SELECT * FROM Users WHERE email = ? ",
    [req.user.email],
    (err, results) => {
      user = JSON.parse(JSON.stringify(results))[0];
      // update profile based on user.
      db.query(
        "UPDATE profiles SET ? WHERE profiles.user_id = ? ",
        [updated_profile, user.user_id],
        (err, results) => {
          // Get profile based on user
          if (err) throw err;
          db.query(
            "SELECT * FROM profiles WHERE user_id = ? ",
            [user.user_id],
            (err, results) => {
              if (err) {
                return res.sendStatus(400);
              } else {
                rows = JSON.parse(JSON.stringify(results));
                if (rows.length > 0) {
                  profile = rows[0];
                  return res.send(profile);
                } else {
                  return res.sendStatus(400);
                }
              }
            }
          );
        }
      );
    }
  );
});

module.exports = router;
