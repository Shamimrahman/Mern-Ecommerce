const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/asyncCatchError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const asyncCatchError = require("../middlewares/asyncCatchError");
const cloudinary = require("cloudinary");

//register a user=>/api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

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

//password recovery mail sent at=> api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this mail", 404));
  }
  //get reset token
  const resetToken = user.getResetPasswordToken();

  //reset password token save to user
  await user.save({ validateBeforeSave: false });

  //create reset password url
  //const resetUrl = `${req.protocol}://${req.get(
  //"host"
  //)}/api/v1/password/reset/${resetToken}`;

  const resetUrl = `${process.env.FRONTEND_URL}
  /password/reset/${resetToken}`;

  const message = `your password reset token is as follow:\n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery.",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//password reset at-=> api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //hash url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  //setup new password
  user.password = req.body.password;
  (user.resetPasswordToken = undefined), (user.resetPasswordExpire = undefined);

  await user.save();
  sendToken(user, 200, res);
});

//get logined user info => api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update password at=> api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //check previous password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("Old Password is Incorrect"));
  }

  if (req.body.oldPassword === req.body.password) {
    return next(
      new ErrorHandler(
        "You entered your previous password. Please choose another Password!"
      )
    );
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

//update user profile => api/v1/me/update
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //update avatar:TODO

  // Update avatar
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//logout part =>api/v1/logout
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//admin routes

//admin get all user
// aluser=> api/v1/admin/users
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//get single user by admin => api/v1/admin/user/:id
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with this id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user detail by admin api/v1/admin/user/:id
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserInfo = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  //update avatar:TODO
  const user = await User.findByIdAndUpdate(req.params.id, newUserInfo, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//delete user details by admin api/v1/admin/user/:id
exports.userDelete = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with this id: ${req.params.id}`)
    );
  }

  //remove avatar from cloudary-todo

  await user.remove();

  res.status(200).json({
    success: true,
  });
});

//order product

exports.orderProduct = catchAsyncError(async (req, res, next) => {});
exports.confirmOrder = catchAsyncError(async (req, res, next) => {});
exports.updateOrder = catchAsyncError(async (req, res, next) => {});
