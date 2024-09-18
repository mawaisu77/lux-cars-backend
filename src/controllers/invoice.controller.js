const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const invoiceService = require("../services/invoice.service");

const generateInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.generateInvoice(req);
  res
    .status(201)
    .json(new ApiResponse(201, invoice, "Invoice Generated successfully."));
});

module.exports = {
  generateInvoice,
};
