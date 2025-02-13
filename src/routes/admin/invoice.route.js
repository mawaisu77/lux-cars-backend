const { Router } = require("express");
const { generateInvoice, getAllInvoices } = require("../../controllers/invoice.controller.js");
const { upload } = require("../../middlewares/multer.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.post(
  "/generate-invoice",
  isAuthenticatedAdmin,
  upload.single("invoice"),
  generateInvoice
);

router.get("/get-all-invoices", isAuthenticatedAdmin, getAllInvoices)

module.exports = router;