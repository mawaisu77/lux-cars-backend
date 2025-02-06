// file to define the routes for the Paymnet integration
const express = require("express");
const router = express.Router();
const { ApiResponse } = require("../utils/ApiResponse")
const { AppError } = require("../utils/ApiError")
const { processPayment } = require("../middlewares/payment");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post(
  "/process-payment",
  isAuthenticatedUser,
  processPayment,
  async (req, res) => {
    try {
      res.status(201).json(new ApiResponse(201, req.paymentResult.FinalStatus, "Payment processed successfully"));
    } catch (error) {
      throw new AppError(400, `Payment Failed Due To: ${error.message}`)
    }
  }
);

module.exports = router;