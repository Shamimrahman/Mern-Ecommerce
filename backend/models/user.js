const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxlength: [30, "your name cant be exceed 30 characters"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Your mail"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Mail Address"],
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [6, "password must be six character"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      //required: true,
    },

    url: {
      type: String,
      //required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetpasswordExpire: Date,
});

module.exports = mongoose.model("user", userSchema);
