const { Router } = require("express");
const { createBidCar, updateBidCar, placeBid, findBidCars  } = require("../controllers/bidCars.controller.js");
const { isAuthenticatedUser } = require('../middlewares/auth.js')

const router = Router()

router.get('/bid-cars/find-bid-cars', findBidCars)
router.post('/bid-cars/create-bid-car', createBidCar)
router.put('/bid-cars/update-bid-car', updateBidCar)
router.post('/bid-cars/place-bid', isAuthenticatedUser, placeBid)


module.exports =  router