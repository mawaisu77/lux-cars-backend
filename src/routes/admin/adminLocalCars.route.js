const { Router } = require("express");
const {
  changeCarStatus,
  getAllUnApprovedLocalCars
} = require("../../controllers/localCars.controller.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.post("/change-local-car-status", isAuthenticatedAdmin, changeCarStatus);
router.get("/get-unapproved-local-cars", isAuthenticatedAdmin, getAllUnApprovedLocalCars);

module.exports = router;
