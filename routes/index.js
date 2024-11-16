var express = require("express");
var router = express.Router();
var pool = require("../db/pool");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT messages.*, users.firstname, users.lastname
      FROM messages
      JOIN users ON messages.created_by = users.id
    `);

    res.render("index", { title: "Members Only", messages: rows });
  } catch (err) {
    return err;
  }
});

module.exports = router;
