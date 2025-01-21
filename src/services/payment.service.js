const axios = require("axios");
const qs = require("querystring");

// Set your test (sandbox) credentials here
const publisherName = "luxfirstch"; // Replace with your sandbox account username
const publisherPassword = "9PMSZnRWt4gnbPzB"; // Replace with your sandbox Remote Client Password

// Set URL to the sandbox for testing transactions (PlugNPay Test URL)
const pnpPostUrl = "https://pay1.plugnpay.com/payment/pnpremote.cgi";

// Default values for testing
const testingData = {
    defaultCardNumber: "4111111111111111", // Valid test card number
    defaultCardCVV : "123", // Default CVV
    defaultCardExp : "12/25", // Default expiration date (MM/YY)
    defaultAmount : "10.00", // Default amount for the transaction
    defaultCardName : "John Doe", // Default cardholder name
    defaultEmail : "johndoe@example.com", // Default email address
    defaultIpAddress : "127.0.0.1", // Default IP address
    defaultBillingAddress : "123 Main St", // Default billing address
    defaultBillingZip : "12345", // Default billing zip
    defaultBillingCity : "Some City", // Default billing city
    defaultBillingState : "CA", // Default billing state
    defaultBillingCountry : "US", // Default billing country
    defaultShippingName : "John Doe", // Default shipping name
    defaultShippingZip : "12345", // Default shipping zip
    defaultShippingCity : "Some City", // Default shipping city
    defaultShippingState : "CA", // Default shipping state
    defaultShippingCountry : "US", // Default shipping country
}


// Define the route to handle the transaction
const makePayment = async (req, res) => {
  try {

    const requiredFields = [
        'card_number', 'card_cvv', 'card_exp', 'card_amount', 
        'card_name', 'email', 'ip', 'shipname', 'card_address1', 'card_address2', 'card_zip', 'card_state', 'card_country'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        throw new Error(`The following fields are not defined: ${missingFields.join(', ')}`);
    }

    const { card_number, card_cvv, card_exp, card_amount, 
        card_name, email, ip, shipname, card_address1, card_address2, card_zip, card_state, card_country  } = req.body;
    // Prepare POST data to be sent to PlugNPay
    const pnpPostValues = {
      "publisher-name": publisherName,
      "publisher-password": publisherPassword,
      "card-number": req.body.card_number || defaultCardNumber, // Use provided or default card number
      "card-cvv": req.body.card_cvv || defaultCardCVV, // Use provided or default CVV
      "card-exp": req.body.card_exp || defaultCardExp, // Use provided or default expiration date
      "card-amount": req.body.card_amount || defaultAmount, // Use provided or default amount
      "card-name": req.body.card_name || defaultCardName, // Use provided or default cardholder name
      email: req.body.email || defaultEmail, // Use provided or default email
      ipaddress: req.ip || defaultIpAddress, // Use IP address or default

      // // Billing address info
      // "card-address1": req.body.card_address1 || defaultBillingAddress,
      // "card-address2": req.body.card_address2 || "",
      // "card-zip": req.body.card_zip || defaultBillingZip,
      // "card-city": req.body.card_city || defaultBillingCity,
      // "card-state": req.body.card_state || defaultBillingState,
      // "card-country": req.body.card_country || defaultBillingCountry,
      // Shipping address info
      shipinfo: "1",
      shipname: req.body.shipname || defaultShippingName,
      address1: req.body.card_address1 || defaultBillingAddress,
      address2: req.body.card_address2 || "",
      zip: req.body.card_zip || defaultShippingZip,
      state: req.body.card_state || defaultShippingState,
      country: req.body.card_country || defaultShippingCountry,
    };

    // Convert the object into a URL-encoded string
    const pnpPostData = qs.stringify(pnpPostValues);

    // Make the POST request using axios to the PlugNPay Test URL
    const response = await axios.post(pnpPostUrl, pnpPostData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    // Decode the result (assuming the response is URL encoded)
    const pnpResultDecoded = decodeURIComponent(response.data);

    // Parse the response into an object (similar to PHP's explode function)
    const pnpTransactionArray = {};
    const pnpTempArray = pnpResultDecoded.split("&");
    pnpTempArray.forEach((entry) => {
      const [name, value] = entry.split("=");
      pnpTransactionArray[name] = value;
    });

    // Handle the transaction result
    if (pnpTransactionArray["FinalStatus"] === "success") {
      console.log(pnpTransactionArray);
      res.sendFile("success.html", { root: __dirname });
    } else if (pnpTransactionArray["FinalStatus"] === "badcard") {
      res.sendFile("badcard.html", { root: __dirname });
    } else if (pnpTransactionArray["FinalStatus"] === "fraud") {
      res.sendFile("fraud.html", { root: __dirname });
    } else if (pnpTransactionArray["FinalStatus"] === "problem") {
      res.sendFile("problem.html", { root: __dirname });
    } else {
      res.sendFile("error.html", { root: __dirname });
    }
  } catch (error) {
    console.error("Error in transaction:", error);
    // res.sendFile("error.html", { root: __dirname });
  }
}

module.exports = {
    makePayment
}