const { where } = require('sequelize');
const { Op } = require('sequelize');

const CarDealers = require('../db/models/cardealers');

const getDealerByUserID = async (id) => {
    return await CarDealers.findOne({where : { userID: id }});
};



module.exports = {
    getDealerByUserID,
};
