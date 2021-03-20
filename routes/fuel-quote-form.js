var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
const authenticateToken = require("../authenticate");

router.post("/", authenticateToken, (req, res, next) => {
  const { gallons, date } = req.body;
  // console.log(gallons);
  // console.log(date);
  let response = {
    address: "123 Temporary Address Ln",
    suggestedPrice: "1000.00",
    amountDue: "1000.00",
  };
  res.json(response);
});

module.exports = router;
