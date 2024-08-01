const { Router } = require("express");
const { axiosPrivate } = require("../utils/axiosPrivate")
const { getAllCars, getCarByLotID, carsMakesModels } = require("../controllers/cars.controller");
const router = Router()

router.get('/cars/get-all-cars', getAllCars)
router.get('/cars/get-car-by-lot-id', getCarByLotID)
router.get('/cars/get-cars-makes-models', carsMakesModels)

module.exports = router
