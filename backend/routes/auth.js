const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  logout,
} = require("../controller/authController");

const { isAuthenticatedUser } = require("../middlewares/auth");

//create user route
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

module.exports = router;
