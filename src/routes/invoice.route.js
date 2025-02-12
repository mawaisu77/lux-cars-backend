const { Router } = require("express");
const { getUserInvoices } = require("../controllers/invoice.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = Router();

router.get(
  "/get-user-all-invoices",
  isAuthenticatedUser,
  getUserInvoices
);

module.exports = router;