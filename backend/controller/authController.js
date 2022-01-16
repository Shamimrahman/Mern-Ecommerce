const User = require("../models/user");
const ErroHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/asyncCatchError");

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

  res.status(201).json({
    success: true,
    user,
  });
});
