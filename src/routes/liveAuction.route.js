const { Router } = require("express");
const { updateLiveCarListData, joinAuction, liveCarListData } = require("../controllers/liveAuction.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.get('/live-auction/update-car-list', updateLiveCarListData)
router.get('/live-auction/join-auction', joinAuction)
router.get('/live-auction/car-list', liveCarListData)


module.exports = router
