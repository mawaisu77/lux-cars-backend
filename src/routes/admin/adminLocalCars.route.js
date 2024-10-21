const { Router } = require("express");
const {
  changeCarStatus,
  getAllUnApprovedLocalCars
} = require("../../controllers/localCars.controller.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.put("/change-local-car-status",  changeCarStatus);
router.get("/get-unapproved-local-cars", getAllUnApprovedLocalCars);

module.exports = router;
