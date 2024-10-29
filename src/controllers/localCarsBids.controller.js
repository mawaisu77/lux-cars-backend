const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const localCarsBidsService = require("../services/localCarsBids.service.js");

const placeBid = asyncHandler(async (req, res) => {
  const bid = await localCarsBidsService.placeBid(req);
  res.status(201).json(new ApiResponse(201, bid, "Bid has been placed successfully."));
});

const getAllBidsOnLocalCarWithUserDetails = asyncHandler(async (req, res) => {
    const bidsData = await localCarsBidsService.getAllBidsOnLocalCarWithUserDetails(req);
    res.status(201).json(new ApiResponse(201, bidsData, "BidData been fetched successfully."));
  });

  

const getUserAllBids = asyncHandler(async (req, res) => {
  const bidsData = await localCarsBidsService.getUserAllBids(req);
  res.status(201).json(new ApiResponse(201, bidsData, "BidData been fetched successfully."));
});


module.exports = {
    placeBid,
    getAllBidsOnLocalCarWithUserDetails,
    getUserAllBids
};
