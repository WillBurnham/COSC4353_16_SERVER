var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
const authenticateToken = require("../authenticate");
var db = require("../database");

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
router.post("/", authenticateToken, async (req, res, next) => {
  //Get user based on email,
  db.query(
    "SELECT * FROM Users WHERE email = ? ",
    [req.user.email],
    (err, results) => {
      user = JSON.parse(JSON.stringify(results))[0];
      console.log("User: ", user);
      db.query(
        "SELECT * FROM profiles WHERE user_id = ? ",
        [user.user_id],
        (err, results) => {
          profile = JSON.parse(JSON.stringify(results))[0];
          console.log(profile);

          //Calcuate Suggested Price and Amount Due.
          let suggested_price = 0;
          let current_price = 1.5;
          let amount_due = 0;
          let rate_history_factor = 0;
          let gallons_factor = 0.2;
          let profit_factor = 0.1;
          let location_factor = profiles.state == "TX" ? 0.2 : 0.4;
          //Get existing fuel_quotes.
          db.query(
            "SELECT * FROM fuel_quotes WHERE user_id = ?",
            [user.user_id],
            (err, results) => {
              if (err) throw err;
              console.log("Existing quotes: ", results);
              if (JSON.parse(JSON.stringify(results)).length > 0) {
                rate_history_factor = 0.1;
              }
              gallons_factor = req.body.gallons > 1000 ? 0.2 : 0.3;
              let margin =
                location_factor -
                rate_history_factor +
                gallons_factor +
                profit_factor;
              suggested_price = (current_price + margin).toFixed(2);
              amount_due = (req.body.gallons * suggested_price).toFixed(2);

              let fuel_quote = {
                user_id: user.user_id,
                gallons: req.body.gallons,
                suggested_price: suggested_price,
                delivery_date: req.body.date,
                total_amount: amount_due,
              };
              //Get current address from profile table.
              db.query(
                "SELECT * FROM profiles WHERE profiles.user_id = ?",
                [user.user_id],
                (err, results) => {
                  if (err) throw err;
                  row = JSON.parse(JSON.stringify(results))[0];
                  fuel_quote["address_one"] = row.address_one;
                  fuel_quote["address_two"] = row.address_two;
                  fuel_quote["city"] = row.city;
                  fuel_quote["state"] = row.state;
                  fuel_quote["zip_code"] = row.zip_code;

                  db.query(
                    "INSERT INTO fuel_quotes SET ? ",
                    fuel_quote,
                    (err, results) => {
                      if (err) throw err;
                      console.log(results);
                      res.send(200);
                    }
                  );
                }
              );
              //Insert quote into table.
            }
          );
        }
      );
    }
  );
});

router.get("/all_quotes", authenticateToken, (req, res, next) => {
  db.query(
    "SELECT * FROM Users WHERE email = ? ",
    [req.user.email],
    (err, results) => {
      user = JSON.parse(JSON.stringify(results))[0];
      // console.log("User: ", user);
      //Get existing fuel_quotes.
      db.query(
        "SELECT * FROM fuel_quotes WHERE user_id = ?",
        [user.user_id],
        (err, results) => {
          if (err) throw err;
          // console.log("Existing quotes: ", results);
          let all_quotes = JSON.parse(JSON.stringify(results));
          all_quotes = all_quotes.map((quote) => {
            let full_address = "";
            if (quote.address_two) {
              full_address = `${quote.address_one}, ${quote.address_two}, ${quote.city} ${quote.state} ${quote.zip_code}`;
            } else {
              full_address = `${quote.address_one}, ${quote.city} ${quote.state} ${quote.zip_code}`;
            }
            return {
              ...quote,
              address: full_address,
            };
          });
          console.log(all_quotes);
          return res.send(all_quotes);
        }
      );
    }
  );
});

module.exports = router;
