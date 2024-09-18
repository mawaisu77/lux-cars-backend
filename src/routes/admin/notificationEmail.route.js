const { Router } = require("express");
const {
  sendNotificationEmail,
} = require("../../controllers/notificationEmail.controller");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.post(
  "/send_notification_email",
  isAuthenticatedAdmin,
  sendNotificationEmail
);

module.exports = router;
