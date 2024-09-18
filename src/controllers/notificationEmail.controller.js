const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const notificationEmailService = require("../services/notificationEmail.service");

const sendNotificationEmail = asyncHandler(async (req, res) => {
  const notificationEmail =
    await notificationEmailService.sendNotificationEmail(req);
  res
    .status(201)
    .json(
      new ApiResponse(201, notificationEmail, "Notification Send successfully.")
    );
});

module.exports = {
  sendNotificationEmail,
};
