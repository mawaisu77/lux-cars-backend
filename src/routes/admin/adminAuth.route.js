const { Router } = require("express");
const {
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin
} = require("../../controllers/auth.controller");
const router = Router();

router.route("/auth/register").post(registerAdmin);
router.route("/auth/login").post(loginAdmin);
router.route("/auth/forgot-password").post(forgotPasswordAdmin)

module.exports = router;
