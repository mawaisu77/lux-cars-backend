const { Router } = require("express");
const { registerUser, verifyEmail, requestNewVerificationEmail, login, forgotPassword, resetPassword} = require("../controllers/auth.controller.js");
const router = Router()

router.route("/auth/register").post(registerUser)
router.route("/auth/verify-email/:token").get(verifyEmail)
router.route("/auth/resend-verify-email").post(requestNewVerificationEmail)
router.route("/auth/login").post(login)
router.route("/auth/forgot-password").post(forgotPassword)
router.route("/auth/reset-password/:token").put(resetPassword)


module.exports =  router