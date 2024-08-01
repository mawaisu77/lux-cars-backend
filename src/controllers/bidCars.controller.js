const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const bidCarsService = require('../services/bidCars.service.js')

const createBidCar = asyncHandler(async (req, res) => {
    const bidCar = await bidCarsService.createBidCar(req)
    res.status(201).json(new ApiResponse(201, bidCar, "BidCar Created successfully.", ));
})

const updateBidCar = asyncHandler(async (req, res) => {
    const bidCar = await bidCarsService.updateBidCar(req)
    res.status(201).json(new ApiResponse(201, bidCar, "BidCar Updated successfully.", ));
})

const placeBid = asyncHandler(async (req, res) => {
    const bidCar = await bidCarsService.placeBid(req)
    res.status(201).json(new ApiResponse(201, bidCar, "Bid Placed successfully.", ));
})

module.exports = {
    createBidCar,
    updateBidCar,
    placeBid
}
