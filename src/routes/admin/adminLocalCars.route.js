const { Router } = require("express");
const {
  changeCarStatus,
  approveLocalCar,
  getAllUnApprovedLocalCars,
  
} = require("../../controllers/localCars.controller.js");
const {
    createOffer,
    getCarAllOffers
} = require("../../controllers/localCarsOffers.controller.js")
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.put("/approve-local-car", isAuthenticatedAdmin, approveLocalCar);
//router.put("/change-local-car-status", isAuthenticatedAdmin, changeCarStatus);
router.get("/get-unapproved-local-cars", isAuthenticatedAdmin, getAllUnApprovedLocalCars);
router.post(
  "/local-cars-offers/create-offer",
  createOffer
);
router.get("/local-cars-offers/get-car-all-offers", getCarAllOffers)

module.exports = router;
