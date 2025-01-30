const ApiError = require('../utils/ApiError');
const querystring = require('querystring');
const axios = require('axios');
const paymentRepository = require('../repositories/payment.repository');

exports.processPayment = async (req, res, next) => {
  // Check if payment is already successful
  if (req.body.paymentStatus === "success") {
    return next();
  }

  // Validate required fields
  const requiredFields = [
    "card_number",
    "card_cvv",
    "card_exp",
    "card_amount",
    "card_name",
    "email",
    "card_address1",
    "card_zip",
    "card_city",
    "card_state",
    "card_country",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return next(new ApiError(400, "Missing required fields", { missingFields }));
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
      "card-address1": req.body.card_address1,
      "card-address2": req.body.card_address2 || "",
      "card-zip": req.body.card_zip,
      "card-city": req.body.card_city,
      "card-state": req.body.card_state,
      "card-country": req.body.card_country,
      shipinfo: "1",
      shipname: req.body.card_name,
      address1: req.body.card_address1,
      address2: req.body.card_address2 || "",
      zip: req.body.card_zip,
      state: req.body.card_state,
      country: req.body.card_country,
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
      
      // Save payment using repository
      await paymentRepository.createPayment({
        userID: req.user.id,
        paymentPurpose: req.body.paymentPurpose,
        amount: parseFloat(pnpTransactionArray["amountcharged"]),
        currency: pnpTransactionArray["currency"].toUpperCase(),
        orderID: pnpTransactionArray["orderID"],
        paymentStatus: 'completed',
        paymentMethod: 'credit_card',
        cardType: pnpTransactionArray["card-type"],
        lastFourDigits: pnpTransactionArray["receiptcc"].slice(-4),
        transactionDetails: pnpTransactionArray
      });

      return next();
    } else {
      return next(new ApiError(400, `Payment failed: ${pnpTransactionArray["FinalStatus"]}`, { details: pnpTransactionArray }));
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    return next(new ApiError(500, "Payment processing failed", { details: error.message }));
  }
};
