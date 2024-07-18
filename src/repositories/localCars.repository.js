const { where } = require('sequelize');
const { Op } = require('sequelize');

const LocalCars = require('../db/models/localcars');

const createLocalCar = async (carData) => {
    return await LocalCars.create(carData);
};



module.exports = {
    createLocalCar,
};
