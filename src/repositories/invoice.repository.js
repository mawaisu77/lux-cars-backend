const Invoice = require("../db/models/invoices");

const generateInvoice = async (invoicePayload) => {
  return await Invoice.create(invoicePayload);
};

const getUserInvoices = async (userID) => {
  return await Invoice.findAll({ userID });
};

const changeInvoiceStatusToPaid = async (invoiceID) => {
  return await Invoice.update({ status: 'Paid' }, { where: { id: invoiceID } });
};

module.exports = {
  generateInvoice,
  getUserInvoices,
  changeInvoiceStatusToPaid
};
