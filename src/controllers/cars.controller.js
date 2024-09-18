const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const carsService = require('../services/cars.service')

const getAllCars = asyncHandler(async (req, res) => {
    const cars = await carsService.getAllCars(req)
    res.status(201).json(new ApiResponse(201, cars, "Cars fetched successfully.", ));
})

const getAllCarsTesting = asyncHandler(async (req, res) => {
    const cars = await carsService.getAllCarsTesting(req)
    res.status(201).json(new ApiResponse(201, cars, "Cars fetched successfully.", ));
})

const getCarByLotID = asyncHandler(async (req, res) => {
    const car = await carsService.getCarByLotID(req)
    res.status(201).json(new ApiResponse(201, car, "Cars fetched successfully.", ));
})

const getCarByLotIDTesting = asyncHandler(async (req, res) => {
    const car = await carsService.getCarByLotIDTesting(req)
    res.status(201).json(new ApiResponse(201, car, "Cars fetched successfully.", ));
})

const carsMakesModels = asyncHandler(async (req, res) => {
    const carsMakesModels = await carsService.carsMakesModels()
    res.status(201).json(new ApiResponse(201, carsMakesModels, "Car's makes and models fetched successfully.",));
})

const getHistoryCars = asyncHandler(async (req, res) => {
    const historyCars = await carsService.getHistoryCars(req)
    res.status(201).json(new ApiResponse(201, historyCars, "History Cars fetched successfully."))
})

module.exports = {
    getAllCars,
    getCarByLotID,
    carsMakesModels,
    getAllCarsTesting,
    getCarByLotIDTesting,
    getHistoryCars
}
