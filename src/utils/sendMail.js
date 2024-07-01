const nodeMailer = require("nodemailer");

// const fs = require('fs');
// const path = require('path');
const emailConfig = require("./emailConfig.js");

const createTransporter = () => {
    return nodeMailer.createTransport(emailConfig.smtp);
};

const sendEmail = async (options, contentType = 'html') => {
    try {
        const transporter = createTransporter();
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
        };
        if (contentType === 'text') {
            mailOptions.text = options.message;
        }    
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail
