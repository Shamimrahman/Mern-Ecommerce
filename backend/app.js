const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
app.use(express.json());

//for cloudarniy
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//cludinary for images

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_api_secretkey: process.env.CLOUDINARY_API_SECRATE,
});

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
