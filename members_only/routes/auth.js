const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
require("dotenv").config;
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
localStrategy = require("passport-local").Strategy;

// Passport configuration

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect username!" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password!" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (rew, res) => {
  res.render("register");
});

router.post(
  "/register",

  body("confirmPassword").custom((value, { req }) => {
    console.log("Checking password === confirmPassword");
    return value === req.body.password;
  }),

  async (req, res) => {
    try {
      console.log("Getting user from the database:", req.body.username);
      const rows = await pool.query("SELECT * FROM users WHERE username = $1", [
        req.body.username,
      ]);

      const user = rows[0];
      // username is already taken
      if (user) {
        res.json({
          message: "User name is already taken",
        });
      }

      //I all goes well register user to the database
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return err;
        }

        await pool.query(
          "INSERT INTO users (firstname, lastname, username, member, password) VALUES ($1, $2, $3, $4, $5)",
          [
            req.body.firstname,
            req.body.lastname,
            req.body.username,
            process.env.MEMBER,
            hashedPassword,
          ]
        );
        res.redirect("/");
      });
    } catch (err) {
      return err;
    }
  }
);

router.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" })
);

router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return err;
      }
      res.redirect("/");
    });
  });
});

module.exports = router;
