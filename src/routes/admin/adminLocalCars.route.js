const { Router } = require("express");
const {
  changeCarStatus,
  getAllUnApprovedLocalCars,
  getCurrentWeekAuctionCars
  
} = require("../../controllers/localCars.controller.js");
const {
    createOffer,
    getCarAllOffers
} = require("../../controllers/localCarsOffers.controller.js")
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.put("/change-local-car-status", isAuthenticatedAdmin, changeCarStatus);
router.get("/get-unapproved-local-cars", isAuthenticatedAdmin, getAllUnApprovedLocalCars);
router.post(
  "/local-cars-offers/create-offer",
  createOffer
);
router.get("/local-cars-offers/get-car-all-offers", getCarAllOffers)
router.get("/current-week-aunction-cars", getCurrentWeekAuctionCars)

module.exports = router;
