var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog");
const mongoDB = process.env.db || "mongodb+srv://zemen:getup@locallibrary.68332le.mongodb.net/?retryWrites=true&w=majority&appName=local_library";
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

//Set up rate limiter: maximum of twenty requests per minute;
var app = express();
const limiter = RateLimit({
  windowMs:1 * 60 * 1000, // 1 minute
  max:20,
})

app.use(limiter);

// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to b served.
app.use(
  helmet.contentSecurityPolicy({
    directives:{
      "script-src":["'self'","code.jquery.com","cdn.jsdelivr.net"],
    },
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
mongoose.set("strictQuery", false);

//set up mongoose connection

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
