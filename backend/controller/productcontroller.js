//get all product

//use getproducts in routes
exports.getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "This route will show all products in db",
  });
};
