const { Router } = require("express");
const {
    createOffer,
    carsAllOffers
} = require("../controllers/localCarsOffers.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router();

router.post("/local-cars-offers/create-offer", isAuthenticatedUser, createOffer);
router.get("/local-cars-offers/get-all-offers-of-car", carsAllOffers);
// router.get("/local-cars-offers/get-all-offers-sent-by-user", isAuthenticatedUser, getUserPartsRequest);
// router.get("/local-cars-offers/get-all-offers-received-by-user", isAuthenticatedUser, getUserPartsRequest);


module.exports = router;
