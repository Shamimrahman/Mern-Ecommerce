const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [30, ""],
  },

  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, ""],
  },
});

module.exports = mongoose.model("user", userSchema);
