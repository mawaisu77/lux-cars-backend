const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const carsService = require('../services/cars.service')
const getAllCars = asyncHandler(async (req, res) => {
    try {
        const cars = await carsService.getAllCars(req)
        res.status(201).json(new ApiResponse(201, cars, "Cars fetched successfully.", ));
    } catch (err) {
        console.log('Error while sending request');
    }
})
module.exports = {
    getAllCars
}