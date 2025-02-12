const ApiError = require("../utils/ApiError");
const sendEmail = require("../utils/sendImageMail.js");
const { uploadSingleDoc } = require("../utils/uplaodDocument.js");
const invoiceRepository = require("../repositories/invoice.repository.js");
const userService = require("../services/user.service.js");
const { processPayment } = require('./payment.service.js')
const { sequelize } = require("../config/database.js");

const generateInvoice = async (req) => {
  const { referenceId, userID, invoiceType, price } = req.body;
  //console.log("IMG FILE", req.file);
  const invoice = req.file ? await uploadSingleDoc(req) : null;

  const invoicePayload = {
    referenceId,
    userID,
    invoiceType,
    invoice,
    price
  };

  const user = await userService.getUserProfile(userID);

  const userName = user.username;
  const email = user.email;

  const invoiceData = await invoiceRepository.generateInvoice(invoicePayload);

  const message = `Hello ${userName},\n\nFollowing is your invoice for your Parts Request`;

  await sendEmail(
    {
      email,
      subject: "LUX CARS Invoice",
      message,
      imagePath: invoice,
    },
    "text"
  );
  return invoiceData;
};


const getUserInvoices = async (req) => {
  const { userID } = req.body;
  const invoices = await invoiceRepository.getUserInvoices(userID);
  return invoices;
};


const payInvoice = async (req, res) => {
  const { invoiceID } = req.query
  if(!invoiceID) throw new ApiError(404, "InvoiceId is Required!")
  const transaction = await sequelize.transaction();
  const updatedInvoice = await invoiceRepository.changeInvoiceStatusToPaid(invoiceID, {transaction: transaction});

  try{
    await processPayment(req, res)
    await transaction.commit();
  }catch(error){
    await transaction.rollback();
    throw new ApiError(400, "Payment Failed!")
  }

  return updatedInvoice

};

module.exports = {
  generateInvoice,
  getUserInvoices,
  payInvoice
};
