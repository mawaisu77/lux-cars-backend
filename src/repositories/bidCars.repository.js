const { where } = require('sequelize');
const { Op } = require('sequelize');

const BidCars = require('../db/models/bidCars');

const createBidCar = async (bidCarData) => {
    return await BidCars.create(bidCarData);
}

const getBidCarByLotID =  async (lotID) => {
    return await BidCars.findOne({where: {lot_id: lotID}})
}

const updateBidCar = async (bidCarData) => {
    const bidCarToUpdate = await getBidCarByLotID(bidCarData.lot_id)
    return await bidCarToUpdate.update(bidCarData);
}

module.exports = {
    createBidCar,
    getBidCarByLotID,
    updateBidCar
};
