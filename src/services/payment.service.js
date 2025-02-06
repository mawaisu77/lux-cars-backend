const ApiError = require('../utils/ApiError');
const querystring = require('querystring');
const axios = require('axios');
const paymentRepository = require('../repositories/payment.repository');

const processPayment = async (req, res, next) => {
  console.log("Payment----------------")
  // Check if payment is already successful
  if (req.body.paymentStatus === "success") {
    return
  }

  // Validate required fields
  const requiredFields = [
    "card_number",
    "card_cvv",
    "card_exp",
    "card_amount",
    "card_name",
    "email",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    throw new ApiError(400, "Missing required fields", { missingFields })
  }

  // PlugNPay Configuration
  const publisherName = process.env.PUBLISHER_NAME;
  const publisherPassword = process.env.PUBLISHER_PASSWORD;
  const pnpPostUrl = process.env.PNP_POST_URL;

  try {
    // Prepare POST data
    const pnpPostValues = {
      "publisher-name": publisherName,
      "publisher-password": publisherPassword,
      "card-number": req.body.card_number,
      "card-cvv": req.body.card_cvv,
      "card-exp": req.body.card_exp,
      "card-amount": req.body.card_amount,
      "card-name": req.body.card_name,
      email: req.body.email,
      ipaddress: req.ip || "127.0.0.1",
    };

    // Convert to URL-encoded string
    const pnpPostData = querystring.stringify(pnpPostValues);

    // Make the POST request
    const response = await axios.post(pnpPostUrl, pnpPostData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Parse response
    const pnpResultDecoded = decodeURIComponent(response.data);
    const pnpTransactionArray = {};
    pnpResultDecoded.split("&").forEach((entry) => {
      const [name, value] = entry.split("=");
      pnpTransactionArray[name] = value;
    });

    // Handle response
    if (pnpTransactionArray["FinalStatus"] === "success") {
      req.paymentResult = pnpTransactionArray;
      // console.log(req.paymentResult)
      return true

    } else {
      throw new ApiError(400, `Payment failed: ${pnpTransactionArray["FinalStatus"]}`, { details: pnpTransactionArray })
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    throw new ApiError(500, "Payment processing failed", { details: error.message })
  }
};

const storePaymentData = async(userID, paymentPurpose, paymentDetails) => {
    //Save payment using repository
    await paymentRepository.createPayment({
      userID: userID,
      paymentPurpose: paymentPurpose,
      amount: parseFloat(paymentDetails["amountcharged"]),
      currency: paymentDetails["currency"].toUpperCase(),
      orderID: paymentDetails["orderID"],
      paymentStatus: 'completed',
      paymentMethod: 'credit_card',
      cardType: paymentDetails["card-type"],
      lastFourDigits: paymentDetails["receiptcc"].slice(-4),
      transactionDetails: paymentDetails
    });
}


module.exports = {
  processPayment,
  storePaymentData
}