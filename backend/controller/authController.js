const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/asyncCatchError");
const sendToken = require("../utils/jwtToken");

//register a user=>/api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,

    avatar: {
      public_id: "",
      url: "",
    },
  });

  //store jwt in httponly because jdi amra local storage save kori
  //tahole js code diye easily excess korte parbo
  //so amra utils a jwt er functionality likhbo
  sendToken(user, 200, res);
});

//user login on=> /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user

  if (!email || !password) {
    return next(new ErrorHandler("Please enter eamil and password", 400));
  }

  //find user in db
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //otherwise generate token
  //const token = user.getJwtToken();

  //res.status(201).json({
  //success: "true",
  //token,
  //});

  //store jwt in httponly because jdi amra local storage save kori
  //tahole js code diye easily excess korte parbo
  //so amra utils a jwt er functionality likhbo

  sendToken(user, 200, res);
});
