const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateUserProfile,
  logout,
  getAllUsers,
} = require("../controller/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//create user route
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/logout").get(logout);

//admin route
router
  .route("/admin/getallusers")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

module.exports = router;
