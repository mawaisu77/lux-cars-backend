const nodeMailer = require("nodemailer");

// const fs = require('fs');
// const path = require('path');
const emailConfig = require("./emailConfig.js");
const logger = require("./logger.js");
const fs = require('fs');
const path = require('path');

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
        else if (contentType === 'html' && options.subject === 'LUX CAR Email Verification') {
            const templatePath = path.join(__dirname, 'templates', 'lux-verification.html');
            const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
            const replacedHtml = htmlTemplate
                .replace('{{username}}', options.username)
                .replace('{{verificationUrl}}', options.verificationUrl)
    
            mailOptions.html = replacedHtml;
               // Attach logo with Content-ID
               mailOptions.attachments = [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, '../../public/images/luxcar-logo.png'),
                    cid: 'luxcars_logo',
                },
            ];
        }
        await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error(`Error sending email: ${error}`)
        // console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail
