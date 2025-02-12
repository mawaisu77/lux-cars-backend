const Invoice = require("../db/models/invoices");

const generateInvoice = async (invoicePayload) => {
  return await Invoice.create(invoicePayload);
};

const getUserInvoices = async (userID) => {
  return await Invoice.findAll({ userID });
};



module.exports = {
  generateInvoice,
  getUserInvoices
};
