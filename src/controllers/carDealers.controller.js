const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const carDealers = require('../services/carDealers.service.js');
const AppError = require('../utils/ApiError.js');


const registerCarDealer = asyncHandler(async (req, res) => {
    const dealer = await carDealers.registerCarDealer(req)
    res.status(201).json(new ApiResponse(201, dealer, "Dealer Created successfully." ));
})

const updateCarDealer = asyncHandler(async (req, res) => {
    const dealer = await carDealers.updateCarDealer(req)
    res.status(201).json(new ApiResponse(201, dealer, "Dealer Updated successfully." ));
})

const getDealerByUserID = asyncHandler(async (req, res) => {
    const dealer = await carDealers.getDealerByUserID(req)
    res.status(201).json(new ApiResponse(201, dealer, "Success...." ));

})

module.exports = {
    registerCarDealer,
    updateCarDealer,
    getDealerByUserID
}

