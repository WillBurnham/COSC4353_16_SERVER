var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("jsonwebtoken");

var cors = require("cors");
var app = express();
app.use(cors());

var loginRouter = require("./routes/login");
var signUpRouter = require('./routes/signUp');
var fuelQuoteFormRouter = require('./routes/fuel-quote-form');
var profileRouter = require('./routes/profile');

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRouter);
app.use("/fuel-quote-form", fuelQuoteFormRouter);
app.use("/signUp", signUpRouter);
app.use("/profile", profileRouter);

app.listen(process.env.PORT || "9000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "9000"}`);
});

module.exports = app;
