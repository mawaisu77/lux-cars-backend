// file to define the routes for the Paymnet integration
const express = require("express");
const router = express.Router();
const { ApiResponse } = require("../utils/ApiResponse")
const { AppError } = require("../utils/ApiError")
const { processPayment } = require("../middlewares/payment");
const { isAuthenticatedUser } = require("../middlewares/auth");
const { findPaymentsByUserId } = require("../controllers/payment.controller");

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

router.get(
  "/payments",
  isAuthenticatedUser,
  findPaymentsByUserId
);

module.exports = router;