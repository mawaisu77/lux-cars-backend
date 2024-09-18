const nodeMailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const emailConfig = require("./emailConfig.js");
const logger = require("./logger.js");

const createTransporter = () => {
  return nodeMailer.createTransport(emailConfig.smtp);
};

const sendEmail = async (options, contentType = "html") => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
    };
    if (contentType === "text") {
      mailOptions.text = options.message;
    } else {
      mailOptions.html = options.message;
    }

    if (options.imagePath) {
      mailOptions.attachments = [
        {
          filename: path.basename(options.imagePath),
          path: options.imagePath,
          cid: "unique@image.cid",
        },
      ];
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error(`Error sending email: ${error}`);
    throw error;
  }
};

module.exports = sendEmail;
