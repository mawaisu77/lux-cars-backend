const Invoice = require("../db/models/invoices");

const generateInvoice = async (invoicePayload) => {
  return await Invoice.create(invoicePayload);
};

module.exports = {
  generateInvoice,
};
