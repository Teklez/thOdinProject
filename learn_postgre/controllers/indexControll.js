const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

exports.name_get = asyncHandler(async (req, res, next) => {
  // Adding search functionality via query params
  const search = req.query.search;
  var usernames;
  if (search) {
    usernames = await db.getUsersOnSearch(search);
  } else {
    usernames = await db.getAllUsernames();
  }
  console.log("Usernames", usernames);
  res.send("Usernames:" + usernames.map((user) => user.username).join(", "));
});

exports.name_form_get = asyncHandler(async (req, res, next) => {
  console.log("Not implemented");
});

exports.name_form_post = asyncHandler(async (req, res, next) => {
  console.log("username to be saved: ", req.body.username);
  const { username } = req.body;
  await db.insertUsername(username);
});

exports.delete_all_users = asyncHandler(async (req, res, next) => {
  db.deletAllUsers();
});
