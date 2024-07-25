const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const localCars = require('../services/localCars.service')

const uploadCar = asyncHandler(async (req, res) => {
    const car = await localCars.uploadCar(req)
    res.status(201).json(new ApiResponse(201, car, "Car Uploaded successfully.", ));
})

const getCarByID = asyncHandler(async (req, res) => {
    const car = await localCars.getCarByID(req)
    res.status(201).json(new ApiResponse(201, car, "Success....", ));

})

const updateCar = asyncHandler(async (req, res) => {
    const car = await localCars.updateCar(req)
    res.status(201).json(new ApiResponse(201, car, "Car Updated successfully.", ));
})

const getAllLocalCars = asyncHandler(async (req, res) => {
    const cars = await localCars.getAllLocalCars(req)
    res.status(201).json(new ApiResponse(201, cars, "Success....", ));

})

module.exports = {
    uploadCar,
    getCarByID,
    updateCar,
    getAllLocalCars
}