var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
const authenticateToken = require("../authenticate");

let fuel_quotes = [
  {
    email_fk: "user1@test1.com",
    gallons: 10000,
    date: Date.now().toString(),
    amount_due: 10000,
    suggested_price: 10000,
  },
  {
    email_fk: "user1@test1.com",
    gallons: 20000,
    date: Date.now().toString(),
    amount_due: 20000,
    suggested_price: 20000,
  },
  {
    email_fk: "user1@test1.com",
    gallons: 30000,
    date: Date.now().toString(),
    amount_due: 30000,
    suggested_price: 30000,
  },
];

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
  {
    email_fk: "user2@test2.com",
    full_name: "John Doe",
    address_one: "123 Main St",
    address_two: "APt. 30",
    city: "Houston",
    state: "TX",
    zipcode: "77024",
  },
];
router.post("/", [authenticateToken], (req, res, next) => {
  //Validate Data

  prof = profiles.filter((profile) => profile.email_fk == req.user.email);
  if (prof.length == 0) {
    //User does not exist.
    return res.sendStatus(404);
  } else {
    let create_quote = {
      email_fk: prof[0].email_fk,
      gallons: 10000,
      date: Date.now().toString(),
      amount_due: 10000,
      suggested_price: 10000,
    };
    fuel_quotes.push(create_quote);
    return res.send(200).json(create_quote);
  }
});

router.get("/", authenticateToken, (req, res, next) => {
  prof = profiles.filter((profile) => profile.email_fk == req.user.email);
  if (prof.length == 0) {
    return res.sendStatus(404);
  } else {
    all_quotes = fuel_quotes.filter(
      (quote) => quote.email_fk == prof[0].email_fk
    );
    all_quotes.forEach((quote) => (quote["address"] = prof[0].address_one));
    console.log(all_quotes);
    if (all_quotes.length == 0) {
      return res.sendStatus(404);
    }
    return res.send(200).json(all_quotes);
  }
});

module.exports = router;
