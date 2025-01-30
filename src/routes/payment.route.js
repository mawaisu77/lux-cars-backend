// file to define the routes for the Paymnet integration
const express = require("express");
const router = express.Router();
const { processPayment } = require("../middlewares/payment");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post(
  "/process-payment",
  isAuthenticatedUser,
  processPayment,
  async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Payment processed successfully",
        data: req.paymentResult,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Payment processing failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;