const { Router } = require("express");
const { axiosPrivate } = require("../utils/axiosPrivate")
const { getAllCars } = require("../controllers/cars.controller")
const router = Router()
router.get('/getAllCars', getAllCars)
module.exports = router
