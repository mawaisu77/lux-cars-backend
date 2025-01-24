//updateLiveCarListData
const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const liveAuctionService = require("../services/liveAuction.service");

const updateLiveCarListData = asyncHandler(async (req, res) => {
  const data = await liveAuctionService.updateLiveCarListData(req);
  res
    .status(201)
    .json(new ApiResponse(201, data, "Invoice Generated successfully."));
});

const joinAuction = asyncHandler(async (req, res) => {
    const data = await liveAuctionService.joinAuction(req);
    res
      .status(201)
      .json(new ApiResponse(201, data, "Live-Auction Joined successfully!"));
});


const liveCarListData = asyncHandler(async (req, res) => {
    const cars = await liveAuctionService.liveCarListData()
    res
      .status(201)
      .json(new ApiResponse(201, cars, "Car List!"));
})



module.exports = {
    updateLiveCarListData,
    joinAuction,
    liveCarListData
};
