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

module.exports = {
    updateLiveCarListData,
};
