const express = require("express");
const logINSignUp = express.Router();
const { singup, login } = require("../controller/user/user");

// Signup Route
logINSignUp.post("/signup", singup);
// Login Route
logINSignUp.post("/login", login);
// Error Middleware
logINSignUp.use(async (err, req, res, next) => {
  if (err) {
    res.status(401).json({ error: "i am  login and sing up route error" });
    next();
  }
  next();
});
module.exports = logINSignUp;
