const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
//import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");

//for product and user route
app.use("/api/v1", products);
app.use("/api/v1", auth);

//middleware for error handleing
app.use(errorMiddleware);

//use this app in the server.js
module.exports = app;
