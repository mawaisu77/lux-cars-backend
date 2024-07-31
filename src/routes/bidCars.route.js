const { Router } = require("express");
const { createBidCar, updateBidCar, placeBid } = require("../controllers/bidCars.controller.js");

const router = Router()

router.post('/bid-cars/create-bid-car', createBidCar)
router.put('/bid-cars/update-bid-car', updateBidCar)
router.post('/bid-cars/place-bid', placeBid)

module.exports =  router