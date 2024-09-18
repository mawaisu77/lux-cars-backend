const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const bidCarsService = require("../services/bidCars.service.js");

const createBidCar = asyncHandler(async (req, res) => {
  const bidCar = await bidCarsService.createBidCar(req);
  res
    .status(201)
    .json(new ApiResponse(201, bidCar, "BidCar Created successfully."));
});

const updateBidCar = asyncHandler(async (req, res) => {
  const bidCar = await bidCarsService.updateBidCar(req);
  res
    .status(201)
    .json(new ApiResponse(201, bidCar, "BidCar Updated successfully."));
});

const placeBid = asyncHandler(async (req, res) => {
  const bidCar = await bidCarsService.placeBid(req);
  res
    .status(201)
    .json(new ApiResponse(201, bidCar, "Bid Placed successfully."));
});

const getAllBidCarsByAdmin = asyncHandler(async (req, res) => {
  const data = await bidCarsService.getAllBidCarsByAdmin();

  const bidCars = data.map((cars) => ({
    id: cars.id,
    lot_id: cars.lot_id,
    carDetails: JSON.parse(cars.carDetails),
    currentBid: cars.currentBid,
    noOfBids: cars.noOfBids,
    createdAt: cars.createdAt,
    updatedAt: cars.updatedAt,
  }));
  res
    .status(201)
    .json(new ApiResponse(201, bidCars, "Cars Data Fetched Successfully."));
});

module.exports = {
  createBidCar,
  updateBidCar,
  placeBid,
  getAllBidCarsByAdmin,
};
