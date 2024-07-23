const { where } = require('sequelize');
const { Op } = require('sequelize');

const CarDealers = require('../db/models/cardealers');

const registerCarDealer = async (dealerData) => {
    return await CarDealers.create(dealerData);
}

const getDealerByUserID = async (id) => {
    return await CarDealers.findOne({where : { userID: id }});
}

const updateCarDealer = async (dealerData, id) => {
    const delaerToUpdate = await getDealerByUserID(id)
    return await delaerToUpdate.update(dealerData);
};




module.exports = {
    getDealerByUserID,
    registerCarDealer,
    updateCarDealer
};
