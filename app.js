<<<<<<< HEAD
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

=======
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var loginRouter = require("./routes/login");
var signUpRouter = require("./routes/signUp");
>>>>>>> 51a8d61cf881b20fabc5c4b4e7842f8f0fea9f6d
var cors = require("cors");

var app = express();
app.use(cors());

var signUpRouter = require('./routes/signUp');
var fuelQuoteFormRouter = require('./routes/fuel-quote-form');

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

<<<<<<< HEAD
app.use('/signUp', signUpRouter);
app.use('/fuel-quote-form', fuelQuoteFormRouter);
=======
app.use("/login", loginRouter);
app.use("/signUp", signUpRouter);
>>>>>>> 51a8d61cf881b20fabc5c4b4e7842f8f0fea9f6d

app.listen(process.env.PORT || "9000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "9000"}`);
});

// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://localhost:3000");
//   next();
// });

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
