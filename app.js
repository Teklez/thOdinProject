var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var { PrismaClient } = require("@prisma/client");
var { PrismaSessionStore } = require("@quixo3/prisma-session-store");
var bcrypt = require("bcryptjs");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const prisma = new PrismaClient();
const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

app.use(
  session({
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
    secret: "mamaaintraisenopunk",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
  })
);

passport.use(new LocalStrategy(async (username, password, done) => {}));

// Route handlers

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login-form");
});

app.get("/signup", (req, res) => {
  res.render("signup-form");
});

app.post("/signup", async (req, res) => {
  console.log("sign up request");

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      res.json({
        err: "username already exists.",
      });
      return;
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        throw { message: "Error while hashing password" };
      }

      await prisma.user.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
        },
      });
      res.redirect("/");
    });
  } catch (error) {
    return error;
  }
});

app.post("/login", (req, res) => {
  // do stuffs
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
