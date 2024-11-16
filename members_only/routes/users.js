var express = require("express");
var router = express.Router();
var pool = require("../db/pool");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/become_member", (req, res, next) => {
  res.render("become_member");
});

router.get("/add_message", (req, res, next) => {
  res.render("add_message");
});

router.post("/not_member", async (req, res) => {
  try {
    await pool.query("UPDATE users SET member = false WHERE id = $1", [
      req.user.id,
    ]);

    console.log("Membership ended successfully");
    res.redirect("/");
  } catch (err) {
    return err;
  }
});

router.post("/become_member", async (req, res, next) => {
  try {
    console.log("User from the become member", req.userf);
    if (req.body.passcode !== "thug-for-life") {
      res.json({
        message: "Incorrect passcode! try again.",
      });
    }
    await pool.query("UPDATE users SET member = $1 WHERE id = $2", [
      true,
      req.user.id,
    ]);
    res.redirect("/");
  } catch (err) {
    return err;
  }
});

router.post("/add_message", async (req, res, next) => {
  try {
    await pool.query(
      "INSERT INTO messages (title, message, created_by) VALUES ($1, $2, $3)",
      [req.body.title, req.body.message, req.user.id]
    );

    res.redirect("/");
  } catch (err) {
    return err;
  }
});

router.post("/messages/:id/delete", async (req, res) => {
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [req.params.id]);
    res.redirect("/");
  } catch (err) {
    return err;
  }
});
module.exports = router;
