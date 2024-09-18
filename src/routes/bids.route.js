const { Router } = require("express");
const { saveBid } = require("../controllers/bids.controller.js");
const { getAllBidsOfUser, getAllBidsOnCar } = require("../controllers/bids.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/bids/save-bid', saveBid)
router.get('/bids/user-all-bids', isAuthenticatedUser, getAllBidsOfUser)
router.get('/bids/get-all-bids-on-car/:lot_id', getAllBidsOnCar)


module.exports = router
