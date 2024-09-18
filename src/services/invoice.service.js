const ApiError = require("../utils/ApiError");
const sendEmail = require("../utils/sendImageMail.js");
const { uploadSingleDoc } = require("../utils/uplaodDocument.js");
const invoiceRepository = require("../repositories/invoice.repository.js");
const userService = require("../services/user.service.js");

const generateInvoice = async (req) => {
  const { referenceId, userID, invoiceType } = req.body;
  console.log("IMG FILE", req.file);
  const invoice = req.file ? await uploadSingleDoc(req) : null;

  const invoicePayload = {
    referenceId,
    userID,
    invoiceType,
    invoice,
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

module.exports = {
  generateInvoice,
};
