const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const localCars = require('../services/localCars.service')

const uploadCar = asyncHandler(async (req, res) => {
    const car = await localCars.uploadCar(req)
    res.status(201).json(new ApiResponse(201, car, "Car Uploaded successfully.", ));

})

const updateCar = asyncHandler(async (req, res) => {
    const car = await localCars.updateCar(req)
    res.status(201).json(new ApiResponse(201, car, "Car Updated successfully.", ));

})

module.exports = {
    uploadCar,
    updateCar
}