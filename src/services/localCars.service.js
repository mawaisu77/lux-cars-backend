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

const getAllApprovedLocalCars = async (req, res) => {
  const query = { ...req.query }
  console.log(query)
  const localCars = await localCarsRepository.getAllApprovedLocalCars(query);
  if (localCars.length === 0) {
    throw new ApiError(404, "No cars found!");
  }
  return {
    cars: localCars,
  };
};

const changeCarStatus = async (req) => {
  const { carId } = req.body;
  const car = await localCarsRepository.getCarByID(carId);
  if (!car) {
    throw new ApiError(404, "Car does not exists.");
  }
  const carStatus = await localCarsRepository.changeCarStatus(carId);
  return carStatus;
};

module.exports = {
  uploadCar,
  getCarByID,
  updateCar,
  getUserAllLocalCars,
  getAllUnApprovedLocalCars,
  getAllApprovedLocalCars,
  changeCarStatus,
};
