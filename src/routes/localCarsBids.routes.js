const { Router } = require("express");
const { saveBid } = require("../controllers/bids.controller.js");
const { getAllBidsOfUser, getAllBidsOnCar } = require("../controllers/bids.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { placeBid, getAllBidsOnLocalCarWithUserDetails } = require("../controllers/localCarsBids.controller.js")

const router = Router()

router.post('/local-cars-bids/place-bid', isAuthenticatedUser , placeBid)
router.get('/local-cars-bids/get-all-bids', getAllBidsOnLocalCarWithUserDetails)


module.exports = router
