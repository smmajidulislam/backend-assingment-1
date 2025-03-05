const express = require("express");
const authorizeUser = express.Router();
const { profile, user } = require("../controller/user/user");

// Login user profile Route
authorizeUser.get("/profile", profile);
// all user Route
authorizeUser.get("/users", user);
// Error Middleware
authorizeUser.use(async (err, req, res, next) => {
  if (err) {
    res.status(401).json({ error: "i am  authorize user route error" });
    next();
  }
  next();
});
module.exports = authorizeUser;
