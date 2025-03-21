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

const payInvoice = asyncHandler(async (req, res) => {
    const invoices = await invoiceService.payInvoice(req, res);
    res.status(200).json(new ApiResponse(200, invoices, "Invoice Paid successfully."));
})

const getAllInvoices = asyncHandler(async (req, res) => {
  const invoices = await invoiceService.getAllInvoices(req, res);
  res.status(200).json(new ApiResponse(200, invoices, "Invoices retrieved successfully."));
})



module.exports = {
  generateInvoice,
  getUserInvoices,
  payInvoice,
  getAllInvoices
};
