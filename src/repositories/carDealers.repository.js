const { where } = require('sequelize');
const { Op } = require('sequelize');

const CarDealers = require('../db/models/cardealers');

const getDealerByUserID = async (id) => {
    return await CarDealers.findOne({where : { userID: id }});
};

const registerCarDealer = async (dealerData) => {
    return await CarDealers.create(dealerData);

}



module.exports = {
    getDealerByUserID,
    registerCarDealer
};
