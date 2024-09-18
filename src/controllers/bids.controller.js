const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const bidService = require("../services/bids.service.js");

const saveBid = asyncHandler(async (req, res) => {
  const bid = await bidService.saveBid(req);
  res
    .status(201)
    .json(new ApiResponse(201, bid, "BidCar has been saved successfully."));
});

const expireBid = asyncHandler(async (req, res) => {
  const expiredBid = await bidService.expireBid(req);
  res.status(201).json(new ApiResponse(201, expiredBid, "BidCar Expired!"));
});

const getAllBidsOfUser = asyncHandler(async (req, res) => {
  const bidsOfUser = await bidService.getAllBidsOfUser(req);
  res
    .status(200)
    .json(new ApiResponse(200, bidsOfUser, "Bids Of User fetched successfully"));
});

const getAllBidsOnCar = asyncHandler(async (req, res) => {
  console.log("req", req.params);
  const lot_id = req.params.lot_id;
  const bidsOnCar = await bidService.getBidsOnCar(lot_id);
  res
    .status(200)
    .json(new ApiResponse(200, bidsOnCar, "Bids On Car fetched successfully"));
});

const getBidsOfUserByAdmin = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const bidsOfUser = await bidService.getBidsOfUserByAdmin(userId);
  res
    .status(200)
    .json(
      new ApiResponse(200, bidsOfUser, "Bids Of User fetched successfully")
    );
});

const getUserByBidIdByAdmin = asyncHandler(async (req, res) => {
  const bidID = req.body.bidID;
  const user = await bidService.getUserByBidIdByAdmin(bidID);
  res
    .status(201)
    .json(new ApiResponse(201, user, "User Fetched Successfully."));
});

module.exports = {
  saveBid,
  expireBid,
  getAllBidsOfUser,
  getAllBidsOnCar,
  getBidsOfUserByAdmin,
  getUserByBidIdByAdmin,
};
