const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const asyncCatchError = require("./asyncCatchError");
const jwt = require("jsonwebtoken");

//check if user is authenticated or not

exports.isAuthenticatedUser = asyncCatchError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access the resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

//handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ($(req.user.role)) is not allowed to success this resources`,
          403
        )
      );
    }

    next();
  };
};
