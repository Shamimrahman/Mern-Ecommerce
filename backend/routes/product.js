const express = require("express");
const router = express.Router();

//fetch getProducts from product controller
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productcontroller");

//get product

router.route("/products").get(getProducts);
router.route("/admin/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProduct);

module.exports = router;
