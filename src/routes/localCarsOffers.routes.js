const { Router } = require("express");
const {
  createOffer,
  carsAllOffers,
  getAllOffersOfUser,
  getCarsWithOffersByUser,
  updateOffer
} = require("../controllers/localCarsOffers.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router();

//router.post("/local-cars-offers/create-offer", isAuthenticatedUser, createOffer);

router.put("/local-cars-offers/update-offer", isAuthenticatedUser, updateOffer)
router.get("/local-cars-offers/get-all-offers-of-car", carsAllOffers);
router.get("/local-cars-offers/get-all-offers-of-user", isAuthenticatedUser, getAllOffersOfUser);

//router.get("/local-cars-offers/get-all-cars-with-offers-by-user", isAuthenticatedUser, getCarsWithOffersByUser);

module.exports = router;
