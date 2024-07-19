const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const localCars = require('../services/localCars.service')

const uploadCar = asyncHandler(async (req, res) => {
    try {
        const car = await localCars.uploadCar(req)
        res.status(201).json(new ApiResponse(201, car, "Car Uploaded successfully.", ));
    } catch (err) {
        console.log('Error while sending request');
    }
})

module.exports = {
    uploadCar
}