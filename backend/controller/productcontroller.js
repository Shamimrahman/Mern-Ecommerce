const Product = require("../models/product");
const errorHandler = require("../utils/errorHandler");
const asyncCatchError = require("../middlewares/asyncCatchError");
//asyncCatchError use kori error handle korar jonno
//suppose amra ekti product create kortesi but nam dei nai
//jdi amra custom error handler use na kori tahole postman a just sending
//dekhabe so jate error ta show kore tar jonno amra asyncCatchError use kori

//create new product in /api/v1/admin/product/new

const ApiFeatures = require("../utils/apiFeatures");

exports.newProduct = asyncCatchError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all product from api/v1/products?keyword=apple&price[gte]=1&price[lte]=200000
//use getproducts in routes
exports.getProducts = asyncCatchError(async (req, res, next) => {
  //product search

  //pagination

  const resPerPage = 4;

  //fronted pagination
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)

    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    products,
    productCount,
  });
});

//get single product in api/v1/product
//use Errorhandler

exports.getSingleProduct = asyncCatchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//update product in /api/v1/admin/product/:id

exports.updateProduct = asyncCatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(202).json({
    success: true,
    product,
  });
});

//delete product in /api/v1/admin/product/:id

exports.deleteProduct = asyncCatchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await Product.remove();
  res.status(202).json({
    success: true,
    message: "Product deleted sucessfully",
  });
});
