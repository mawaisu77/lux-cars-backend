const { where } = require("sequelize");
const { Op } = require("sequelize");

const BidCars = require('../db/models/bidcars');

const createBidCar = async (bidCarData, options = {}) => {
  return await BidCars.create(bidCarData, options);
};

const getBidCarByLotID = async (lotID) => {
  return await BidCars.findOne({ where: { lot_id: lotID } });
};

const updateBidCar = async (bidCarData, options = {}) => {
  const bidCarToUpdate = await getBidCarByLotID(bidCarData.lot_id);
  return await bidCarToUpdate.update(bidCarData, options);
};

const findAllCars = async () => {
  return await BidCars.findAll();
};

module.exports = {
  createBidCar,
  getBidCarByLotID,
  updateBidCar,
  findAllCars,
};
