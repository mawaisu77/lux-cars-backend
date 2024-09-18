const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const savedCars = require('../services/savedCars.service')

const saveCar = asyncHandler(async (req, res) => {
    const car = await savedCars.saveCar(req)
    res.status(201).json(new ApiResponse(201, car, "Car Saved successfully.", ));

})

const deleteCar = asyncHandler(async (req, res) => {
    const car = await savedCars.deleteCar(req)
    res.status(200).json(new ApiResponse(200, car, "Car deleted successfully.", ));
})

const getUsersSavedCars = asyncHandler(async (req, res) => {
    const cars = await savedCars.getUsersSavedCars(req)
    res.status(200).json(new ApiResponse(200, cars, "User's saved cars fetched successfully.", ));
})


module.exports = {
    saveCar,
    deleteCar,
    getUsersSavedCars
}