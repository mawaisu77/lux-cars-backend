const { axiosPrivate } = require("../utils/axiosPrivate.js");
const { shuffleArrays } = require("../utils/helperFunctions.js");
const authRepository = require("../repositories/auth.repository.js");
const logger = require("../utils/logger.js");
const localCarsOffersRepository = require("../repositories/localCarsOffersRepository.repository.js");
const localCarsRepository = require("../repositories/localCars.repository.js");
const { uploadDocs } = require("../utils/uplaodDocument.js");
const ApiError = require("../utils/ApiError.js");

const expireOffer = async (carID) => {
  const offer = await localCarsOffersRepository.getActiveOffers(carID)
  if (offer) {
    offer.offerStatus = "Expired"
    const expiredOffer = await offer.save()
    return expiredOffer
  }
  return 1
}

const createOffer = async (req, res) => {
  const { localCarID, offerPrice } = req.body;

  if (!localCarID) throw new ApiError(400, "LocalCarID in required!");
  if (!offerPrice) throw new ApiError(400, "OfferPrice is required!");
  const expiredOffer = await expireOffer(localCarID)
  if (!expireOffer) throw new ApiError(400, "Error while eexpiring the older Offer")
  const localCar = await localCarsRepository.getCarByID(localCarID)
  if (!localCar) throw new ApiError(400, "Not able to find the LocalCar against the provided CarID");
  localCar.status = "OfferSent"
  await localCar.save()
  const userID = localCar.userID
  if (!userID) throw new ApiError(400, "Unable to get the UserID");

  const offerData = {
    localCarID: localCarID,
    offerPrice: offerPrice,
    userID: userID,
  };

  const offer = await localCarsOffersRepository.createOffer(offerData);
  if (!offer) throw new ApiError(500, "Error in creating the Offer!");

  return offer;
};

const updateOffer = async (req, res) => {
  const offerID = req.query.offerID
  const { offerStatus } = req.body
  if (!offerID) throw new ApiError(404, "OfferID is not provided!")
  if (!offerStatus) throw new ApiError(404, "No offerStatus is provided!")

  const localCarsOffer = await localCarsOffersRepository.getOfferByID(offerID)
  if (!localCarsOffer) throw new ApiError(404, "No Offer found against provided localCarID")
  localCarsOffer.offerStatus = offerStatus
  const offerData = await localCarsOffer.save()

  const localCar = await localCarsRepository.getCarByID(offerData.localCarID)
  if (!localCar) throw new ApiError(404, "No LocalCar found against provided localCarID")
  localCar.status = offerStatus
  const carData = await localCar.save()

  return {
    carData,
    offerData
  }
}

const carsAllOffers = async (req, res) => {
  const carID = req.query.id;
  if (!carID) throw new ApiError(400, "CarID in required!");
  const offers = await localCarsOffersRepository.carsAllOffers(carID);
  if (!offers) throw new ApiError(400, "No Offers found for the Car")
  return offers;
};

const getAllOffersOfUser = async (req, res) => {
  const userId = req.user.id;
  if (!userId) throw new ApiError(401, "User Not Found")
  const allOffersByUser = await localCarsOffersRepository.getAllOffersOfUser(userId);

  const carOffersMap = {};
  allOffersByUser.forEach((offer) => {
    const carId = offer.localCarID;
    if (!carOffersMap[carId]) {
      carOffersMap[carId] = { carData: null, offers: [] };
    }
    carOffersMap[carId].offers.push(offer);
  });

  const offersWithCarDetails = await Promise.all(
    Object.values(carOffersMap).map(async (carOffer) => {
      const carDetail = await localCarsRepository.getCarByID(carOffer.carData ? carOffer.carData.id : carOffer.offers[0].localCarID);
      return {
        carData: carDetail,
        offers: carOffer.offers,
      };
    })
  );

  return offersWithCarDetails;
};

const getCarsWithOffersByUser = async (req, res) => {
  const userId = req.user.id;
  const CarsWithOffers = await localCarsRepository.getUserAllLocalCars(userId);

  const offersOnCar = await Promise.all(
    CarsWithOffers.map(async (cars) => {
      const offers = await localCarsOffersRepository.carsAllOffers(cars.id);
      return {
        carDetails: cars,
        offersOnCars: offers,
      };
    })
  );

  return offersOnCar;
};

module.exports = {
  createOffer,
  carsAllOffers,
  getAllOffersOfUser,
  getCarsWithOffersByUser,
  updateOffer
};
