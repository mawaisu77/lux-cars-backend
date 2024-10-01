const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const localCarsOffers = require("../services/localCarsOffers.service.js");

const createOffer = asyncHandler(async (req, res) => {
  const offer = await localCarsOffers.createOffer(req);
  res
    .status(201)
    .json(new ApiResponse(201, offer, "Offer Created successfully."));
});

const carsAllOffers = asyncHandler(async (req, res) => {
  const offers = await localCarsOffers.carsAllOffers(req);
  res
    .status(201)
    .json(new ApiResponse(201, offers, "Offers fetched successfully."));
});

const getAllOffersOfUser = asyncHandler(async (req, res) => {
  const allOffersByUSer = await localCarsOffers.getAllOffersOfUser(req);
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        allOffersByUSer,
        "Users Offers fetched successfully."
      )
    );
});

const getCarsWithOffersByUser = asyncHandler(async (req, res) => {
  const CarsWithOffers = await localCarsOffers.getCarsWithOffersByUser(req);
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        CarsWithOffers,
        "Users Cars With Offers fetched successfully."
      )
    );
});

module.exports = {
  createOffer,
  carsAllOffers,
  getAllOffersOfUser,
  getCarsWithOffersByUser,
};
