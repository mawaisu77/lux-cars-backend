const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const carDealers = require('../services/carDealers.service.js')


const registerCarDealer = asyncHandler(async (req, res) => {
    try {
        const dealer = await carDealers.registerCarDealer(req)
        res.status(201).json(new ApiResponse(201, dealer, "Dealer Created successfully." ));
    } catch (err) {
        console.log('Error while sending request');
    }
})

module.exports = {
    registerCarDealer
}

