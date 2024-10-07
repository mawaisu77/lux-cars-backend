const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const localCarsBidsService = require("../services/localCarsBids.service.js");

const placeBid = asyncHandler(async (req, res) => {
  const bid = await localCarsBidsService.placeBid(req);
  res.status(201).json(new ApiResponse(201, bid, "Bid has been placed successfully."));
});


module.exports = {
    placeBid
};
