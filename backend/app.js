const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
//import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
//for product and user route
app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

//middleware for error handleing
app.use(errorMiddleware);

//use this app in the server.js
module.exports = app;
