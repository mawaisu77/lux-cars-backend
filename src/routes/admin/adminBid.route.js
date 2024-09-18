const { Router } = require("express");
const {
  getAllBidCarsByAdmin,
} = require("../../controllers/bidCars.controller");
const {
  getAllBidsOnCar,
  getBidsOfUserByAdmin,
  getUserByBidIdByAdmin,
} = require("../../controllers/bids.controller");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.get("/getAllBidCars", isAuthenticatedAdmin, getAllBidCarsByAdmin);
router.get("/getBidsOnCar/:lot_id", isAuthenticatedAdmin, getAllBidsOnCar);
router.get(
  "/getBidsOfUser/:userId",
  isAuthenticatedAdmin,
  getBidsOfUserByAdmin
);
router.get("/getUserByBidId", isAuthenticatedAdmin, getUserByBidIdByAdmin);

module.exports = router;
