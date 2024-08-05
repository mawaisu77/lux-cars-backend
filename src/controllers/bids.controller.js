const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const bidService = require('../services/bids.service.js')

const saveBid = asyncHandler(async (req, res) => {
    const bid = await bidService.saveBid(req)
    res.status(201).json(new ApiResponse(201, bid, "BidCar has been saved successfully.", ));
})

const expireBid = asyncHandler(async (req, res) => {
    const expiredBid = await bidService.expireBid(req)
    res.status(201).json(new ApiResponse(201, expiredBid, "BidCar Expired!", ));
})

module.exports = {
    saveBid,
    expireBid
}
