const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError.js")
const localCarsOffers = require("../services/localCarsOffers.service.js");

const createOffer = asyncHandler(async (req, res) => {
  const offer = await localCarsOffers.createOffer(req);
  res
    .status(201)
    .json(new ApiResponse(201, offer, "Offer Created successfully."));
});

const updateOffer = asyncHandler(async (req, res) => {
  const acceptedOffer = await localCarsOffers.updateOffer(req, res)
  const status = req.body.offerStatus
  if (!status) throw new ApiError(401, "Offer Status is not Provide!")
  var message = ""
  if (status === "OfferRejected") message = "You have Rejected the Offer from the LuxCars!"
  else if (status === "OfferAccepted" ) message = "You have Accepted the offer from the LuxCars!"
  res.status(201).json(new ApiResponse(201, acceptedOffer, message));
})

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

const getCarAllOffers = asyncHandler(async (req, res) => {
  const carOffers = await localCarsOffers.getCarAllOffers(req);
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        carOffers,
        "Car Offers fetched successfully."
      )
    );
})

module.exports = {
  createOffer,
  carsAllOffers,
  getAllOffersOfUser,
  getCarsWithOffersByUser,
  updateOffer,
  getCarAllOffers
};
