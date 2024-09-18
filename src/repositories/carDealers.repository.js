const { where } = require('sequelize');
const { Op } = require('sequelize');

const CarDealers = require('../db/models/cardealers');

const registerCarDealer = async (dealerData) => {
    // saving the dealer data to the database
    return await CarDealers.create(dealerData);
}

const getDealerByUserID = async (id) => {
    // getting the dealer data from the database
    return await CarDealers.findOne({where : { userID: id }});
}

const updateCarDealer = async (dealerData) => {
    // getting the dealer data from the database    
    const delaerToUpdate = await getDealerByUserID(dealerData.userID)
    // updating the dealer data
    return await delaerToUpdate.update(dealerData);
};


module.exports = {
    getDealerByUserID,
    registerCarDealer,
    updateCarDealer
};
