const { Router } = require("express");
const { generateInvoice } = require("../../controllers/invoice.controller.js");
const { upload } = require("../../middlewares/multer.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.post(
  "/generate-invoice",
  isAuthenticatedAdmin,
  upload.single("invoice"),
  generateInvoice
);

module.exports = router;