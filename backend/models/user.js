const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

//password encryption before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//return jwt
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

module.exports = mongoose.model("user", userSchema);
