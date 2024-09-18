const { Router } = require("express");
const {
  getPendingDocumentsByAdmin,
  changeDocumentStatusByAdmin,
  getAllUsersByAdmin,
  getUserDetailByAdmin,
  getAllAdmins
} = require("../../controllers/user.controller");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.get(
  "/getPendingDocuments",
  isAuthenticatedAdmin,
  getPendingDocumentsByAdmin
);
router.post(
  "/changeDocumentStatus",
  isAuthenticatedAdmin,
  changeDocumentStatusByAdmin
);
router.get("/getAllUsers", isAuthenticatedAdmin, getAllUsersByAdmin);
router.get("/getAllAdmins", isAuthenticatedAdmin, getAllAdmins);

router.get(
  "/getUserDetail/:id",
  isAuthenticatedAdmin,
  getUserDetailByAdmin
);

module.exports = router;
