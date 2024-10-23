const { Op } = require('sequelize'); // Import Sequelize Operators
const { axiosPrivate } = require("../utils/axiosPrivate");
const { shuffleArrays } = require("../utils/helperFunctions");
const authRepository = require("../repositories/auth.repository.js");
const logger = require("../utils/logger");
const localCarsRepository = require("../repositories/localCars.repository.js");
const { uploadDocs } = require("../utils/uplaodDocument.js");
const ApiError = require("../utils/ApiError.js");

const uploadCar = async (req, res) => {
  // Uplaoding car images
  //console.log(req.files)
  const carImages = await uploadDocs(req);

  // Getting userID
  const userID = req.user.id;

  // Preparing CarData
  const carData = { ...req.body, userID, carImages };

  // Sending Car to database
  const car = await localCarsRepository.createLocalCar(carData);

  // returning the car
  return car;
};

const getCarByID = async (req, res) => {
  // getting the car from the database
  const car = await localCarsRepository.getCarByID(req.query.id);
  let user;
  if (!car) {
    throw new ApiError(404, "Car does not exists.");
  } else {
    user = await authRepository.findUserById(car.userID);
    //console.log(user);
    if (!user) {
      throw new ApiError(404, "Car Owner does not exists!");
    }
  }

  // returning the car
  return { user, car };
};

const updateCar = async (req, res) => {
  // getting car from database
  const car = await localCarsRepository.getCarByID(req.query.id);
  if (!car) {
    throw new ApiError(404, "Car does not exists.");
  }

  // Uplaoding car images
  var carImages = [];
  if (req.files && !(req.files.length === 0)) {
    carImages = await uploadDocs(req);
  } else {
    carImages = car.carImages;
  }

  // Getting userID
  const userID = req.user.id;

  // Preparing CarData
  const carData = { ...req.body, userID, carImages };

  // Updating CarData
  const UpdatedCar = await localCarsRepository.updateCar(carData, req.query.id);
  return UpdatedCar;
};

const getUserAllLocalCars = async (req, res) => {
  // getting all the cars from the database
  const localCars = await localCarsRepository.getUserAllLocalCars(req.user.id);
  if (localCars.length === 0) {
    throw new ApiError(404, "No cars found!");
  }
  return {
    cars: localCars,
  };
};

const getAllUnApprovedLocalCars = async (req, res) => {
  // getting all the cars from the database
  const localCars = await localCarsRepository.getAllUnApprovedLocalCars();
  if (localCars.length === 0) {
    throw new ApiError(404, "No cars found!");
  }
  return {
    cars: localCars,
  };
};

const getAllLocalCars = async (req, res) => {
  var query = { ...req.query }
  console.log(query)
  if (query.yearFrom || query.yearTo) {
    query.year = {};
    if (query.yearFrom) {
      query.year[Op.gte] = parseInt(query.yearFrom);
      delete query.yearFrom; // Exclude milageFrom from the query
    }
    if (query.yearTo) {
      query.year[Op.lte] = parseInt(query.yearTo);
      delete query.yearTo; // Exclude milageFrom from the query

    }
  }

  // Add milage filter if milageFrom or milageTo is provided
  if (query.milageFrom || query.milageTo) {
    query.mileage = {};
    if (query.milageFrom) {
      query.mileage[Op.gte] = parseInt(query.milageFrom);
      delete query.milageFrom; // Exclude milageFrom from the query

    }
    if (query.milageTo) {
      query.mileage[Op.lte] = parseInt(query.milageTo);
      delete query.milageTo; 
    }
  }
  if (query.auction_date_from || query.auction_date_to) {
    query.auction_date = {};
    if (query.auction_date_from) {
      query.auction_date[Op.gte] = (query.auction_date_from);
      delete query.auction_date_from; // Exclude milageFrom from the query

    }
    if (query.auction_date_to) {
      query.auction_date[Op.lte] = (query.auction_date_to);
      delete query.auction_date_to; 
    }
  }
  console.log(query)
  const localCars = await localCarsRepository.getAllLocalCars(query);
  if (localCars.length === 0) {
    throw new ApiError(404, "No cars found!");
  }
  return {
    cars: localCars,
  };
};

const changeCarStatus = async (req) => {
  const carId = req.query.carId;
  const auction_date = req.body.auction_date
  const car = await localCarsRepository.getCarByID(carId);
  if (!car) {
    throw new ApiError(404, "Car does not exists.");
  }
  car.status = "Approved"
  car.auction_date = auction_date
  const carStatus = await car.save()
  return carStatus;
};

module.exports = {
  uploadCar,
  getCarByID,
  updateCar,
  getUserAllLocalCars,
  getAllUnApprovedLocalCars,
  getAllLocalCars,
  changeCarStatus,
};
