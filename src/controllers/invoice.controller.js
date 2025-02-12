const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const invoiceService = require("../services/invoice.service");

const generateInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.generateInvoice(req);
  res
    .status(201)
    .json(new ApiResponse(201, invoice, "Invoice Generated successfully."));
});

const getUserInvoices = asyncHandler(async (req, res) => {
  const invoices = await invoiceService.getUserInvoices(req);
  res.status(200).json(new ApiResponse(200, invoices, "User's invoices retrieved successfully."));
});



module.exports = {
  generateInvoice,
  getUserInvoices
};
