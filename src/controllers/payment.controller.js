const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const paymentService = require("../services/payment.service");

const findPaymentsByUserId = asyncHandler(async (req, res) => {
  const payments = await paymentService.findPaymentsByUserId(req, res);
  res.status(200).json(new ApiResponse(200, payments, "Payments fetched successfully"));
});

module.exports = {
  findPaymentsByUserId
};
