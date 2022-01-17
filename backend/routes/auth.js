const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/authController");

//create user route
router.route("/register").post(registerUser);
module.exports = router;
