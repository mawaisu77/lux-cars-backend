const { where } = require("sequelize");
const { Op } = require("sequelize");

const LocalCarsOffers = require("../db/models/localcarsoffers");

const createOffer = async (offerData) => {
  // saving the offer data to the database
  return await LocalCarsOffers.create(offerData);
};

const carsAllOffers = async (carID) => {
  return await LocalCarsOffers.findAll({ where: { localCarID: carID } });
};

const getAllOffersOfUser = async (userId) => {
  return await LocalCarsOffers.findAll({ where: { userID: userId } });
};

module.exports = {
  createOffer,
  carsAllOffers,
  getAllOffersOfUser,
};
