const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const registerUser = asyncHandler(async (req, res, next) => {
  await authService.registerUser(req);
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "User created successfully, Please verify your email"
      )
    );
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const result = await authService.verifyEmail(req);
  res
    .status(result.statusCode)
    .json(new ApiResponse(result.statusCode, null, result.message));
});

const requestNewVerificationEmail = asyncHandler(async (req, res, next) => {
  await authService.requestNewVerificationEmail(req);
  res
    .status(201)
    .json(
      new ApiResponse(
        200,
        null,
        "A new verification email has been sent. Please check your email inbox."
      )
    );
});

const login = asyncHandler(async (req, res, next) => {
  const user = await authService.loginUser(req, res);
  res
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});

const forgotPassword = asyncHandler(async (req, res, next) => {
  const email = await authService.forgotPassword(req);
  res
    .status(200)
    .json(new ApiResponse(200, null, `Email sent to ${email} successfully`));
});

const resetPassword = asyncHandler(async (req, res, next) => {
  await authService.resetPassword(req);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});

const registerAdmin = asyncHandler(async (req, res, next) => {
  await authService.registerAdmin(req);
  res
    .status(201)
    .json(new ApiResponse(201, null, "Credentials Sended Successfully"));
});

const loginAdmin = asyncHandler(async (req, res, next) => {
  const admin = await authService.loginAdmin(req, res);
  res
    .status(200)
    .json(new ApiResponse(200, admin, "Admin logged in successfully"));
});

const forgotPasswordAdmin = asyncHandler(async (req, res, next) => {
    const email = await authService.forgotPasswordAdmin(req);
    res
      .status(200)
      .json(new ApiResponse(200, null, `Email sent to ${email} successfully`));
  });

module.exports = {
  registerUser,
  verifyEmail,
  requestNewVerificationEmail,
  login,
  forgotPassword,
  resetPassword,
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin
};
