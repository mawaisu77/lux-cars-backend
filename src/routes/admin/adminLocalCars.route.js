const { Router } = require("express");
const {
  changeCarStatus,
  getAllUnApprovedLocalCars,
  
} = require("../../controllers/localCars.controller.js");
const {
    createOffer
} = require("../../controllers/localCarsOffers.controller.js")
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.put("/change-local-car-status", isAuthenticatedAdmin, changeCarStatus);
router.get("/get-unapproved-local-cars", isAuthenticatedAdmin, getAllUnApprovedLocalCars);
router.post(
  "/local-cars-offers/create-offer",
  isAuthenticatedAdmin,
  createOffer
);

module.exports = router;
