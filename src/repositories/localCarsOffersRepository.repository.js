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

const getAllActiveOffers = async (userId) => {
  return await LocalCarsOffers.findAll({ where: { userID: userId, offerStatus: { [Op.ne]: "Expired" } } });
};

const getOfferByID = async (offerID) => {
  return await LocalCarsOffers.findByPk(offerID);
}

const getActiveOffers = async (carID) => {
  return await LocalCarsOffers.findOne({ where: { localCarID: carID, offerStatus: { [Op.ne]: "Expired" } } });
};


module.exports = {
  createOffer,
  carsAllOffers,
  getAllOffersOfUser,
  getOfferByID,
  getActiveOffers,
  getAllActiveOffers
};
