const { Pool } = require("pg");
require("dotenv").config;
const pool = new Pool({
  user: "zemen",
  host: "dpg-cssp70l2ng1s73angmag-a",
  database: "odin_d1yo",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database successfully.");
    release();
  }
});

module.exports = pool;
