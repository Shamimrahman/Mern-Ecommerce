const Product = require("../models/product");
const errorHandler = require("../utils/errorHandler");
const asyncCatchError = require("../middlewares/asyncCatchError");
//asyncCatchError use kori error handle korar jonno
//suppose amra ekti product create kortesi but nam dei nai
//jdi amra custom error handler use na kori tahole postman a just sending
//dekhabe so jate error ta show kore tar jonno amra asyncCatchError use kori

//create new product in /api/v1/admin/product/new

const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

exports.newProduct = asyncCatchError(async (req, res, next) => {
  //adding user in product
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all product from api/v1/products?keyword=apple&price[gte]=1&price[lte]=200000
//use getproducts in routes
exports.getProducts = asyncCatchError(async (req, res, next) => {
  //error test for frontend react-alert

  //product search
  //pagination
  const resPerPage = 4;

  //fronted pagination
  const productsCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;

  //for loading

  setTimeout(() => {
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resPerPage,
    });
  }, 200);
});

//get all products by admin
exports.getAdminProducts = asyncCatchError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

//get single product in api/v1/product/:id
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

//create new review=> /api/v1/review

exports.createProductReview = asyncCatchError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment === comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforSave: false });

  res.status(200).json({
    success: true,
  });
});

//get Product Reviews => api/v1/reviews?id=....

exports.getProductReviews = asyncCatchError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete Product Reviews => api/v1/reviews?Productid=....&id=

exports.deleteReview = asyncCatchError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;
  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
