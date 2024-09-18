const ApiError = require("../utils/ApiError");
const sendEmail = require("../utils/sendMail");

const sendNotificationEmail = async (req) => {
  const { email, subject, message } = req.body;
  await sendEmail(
    {
      email,
      subject,
      message,
    },
    "text"
  );

  return;
};

module.exports = {
  sendNotificationEmail,
};
