const { Router } = require("express");
const { getUserInvoices, payInvoice } = require("../controllers/invoice.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router = Router();

router.get(
  "/get-user-all-invoices",
  isAuthenticatedUser,
  getUserInvoices
);

router.post(
    "/pay-invoice",
    isAuthenticatedUser,
    payInvoice
)
module.exports = router;