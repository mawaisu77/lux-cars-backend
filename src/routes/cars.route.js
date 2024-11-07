const { Router } = require("express");
const { 
    getAllCars, 
    getCarByLotID, 
    carsMakesModels, 
    getAllCarsTesting, 
    getCarByLotIDTesting, 
    getHistoryCars, 
    getALLCategoriesVehichleCount, 
    calculateEstimatedPriceForTheVehicle
} = require("../controllers/cars.controller");

const router = Router()

router.get('/cars/get-all-cars', getAllCars)
router.get('/cars/get-all-cars/testing', getAllCarsTesting)
router.get('/cars/get-car-by-lot-id', getCarByLotID)
router.get('/cars/get-car-by-lot-id/testing', getCarByLotIDTesting)
router.get('/cars/get-cars-makes-models', carsMakesModels)
router.get('/cars/get-history-cars', getHistoryCars)
router.get('/cars/get-cars-counts', getALLCategoriesVehichleCount)
router.get('/cars/get-cars-average-prices-data', calculateEstimatedPriceForTheVehicle)


module.exports = router
