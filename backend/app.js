const express = require("express");
const app = express();
app.use(express.json());
const errorMiddleware = require("./middlewares/errors");

//import all routes
const products = require("./routes/product");
app.use("/api/v1", products);

//middleware for error handleing
app.use(errorMiddleware);

//use this app in the server.js
module.exports = app;
