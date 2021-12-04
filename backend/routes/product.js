const express = require("express");
const router = express.Router();

//fetch getProducts from product controller
const { getProducts } = require("../controller/productcontroller");

//get product

router.route("/products").get(getProducts);

module.exports = router;
