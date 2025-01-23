const { Router } = require("express");
const { updateLiveCarListData } = require("../controllers/liveAuction.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.get('/live-auction/update-car-list', updateLiveCarListData)


module.exports = router
