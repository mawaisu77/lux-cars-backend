const { Router } = require("express");
const { saveBid, getCarByLotID, carsMakesModels } = require("../controllers/bids.controller.js");
const router = Router()

router.post('/bids/save-bid', saveBid)


module.exports = router
