const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO (username) VALUES ($1)", [username]);
}

async function getUsersOnSearch(search) {
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username LIKE ($1)",
    [`%${search}%`]
  );
  return rows;
}
async function deletAllUsers() {
  await pool.query("TRUNCATE TABLE usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  getUsersOnSearch,
  deletAllUsers,
};
