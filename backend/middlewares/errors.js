const ErrorHandler = require("../utils/errorHandler");
const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessgae: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    //wrong mongoose object id error
    if (err.name === "castError") {
      const message = `Resources not found ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose Validation Error
    if (err.name === "validationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //handling mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    //handling wrong jwt error

    if (err.name === "JsonWebTokenError") {
      const message = "Json Web token is invalid. Try Again!";
      error = new ErrorHandler(message, 400);
    }

    //handling expired jwt error

    if (err.name === "TokenExpiredError") {
      const message = "Json Web token has been expired. Try Again!";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Problem",
    });
  }
};
