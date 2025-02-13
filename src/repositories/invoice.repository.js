const Invoice = require("../db/models/invoices");

const generateInvoice = async (invoicePayload) => {
  return await Invoice.create(invoicePayload);
};

const getUserInvoices = async (userID) => {
  return await Invoice.findAll({ userID });
};

const changeInvoiceStatusToPaid = async (invoiceID, options = {}) => {
  return await Invoice.update({ status: 'Paid' }, { where: { id: invoiceID }, options });
};

const getAllInvoices = async () => {
  return await Invoice.findAll();
};

module.exports = {
  generateInvoice,
  getUserInvoices,
  changeInvoiceStatusToPaid,
  getAllInvoices
};
