const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./dbConnect/dbConnect");
const logINSignUp = require("./api/logSingup");
const authorizeUser = require("./api/userApi");
const productRouter = require("./api/product");
require("dotenv").config();
const apiAuth = require("./autentication/apiAuth");
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
dbConnect();

// login and signup route
app.use("/api", logINSignUp);

// Authentication Middleware
app.use(apiAuth);

// login and user route
app.use("/api", authorizeUser);

// Product Route
app.use("/api/products", productRouter);
// all error middleware
app.use((err, req, res, next) => {
  if (err) {
    console.log("hello");
    return res.status(500).json({ message: err.message });
  }
  next();
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
