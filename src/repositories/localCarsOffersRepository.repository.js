const { where } = require('sequelize');
const { Op } = require('sequelize');

const LocalCarsOffers = require('../db/models/localcarsoffers');

const createOffer = async (offerData) => {
    // saving the offer data to the database
    return await LocalCarsOffers.create(offerData);
};

const carsAllOffers = async (carID) => {
    return await LocalCarsOffers.findAll({where: {localCarID: carID}})
}

module.exports = {
    createOffer,
    carsAllOffers
};
