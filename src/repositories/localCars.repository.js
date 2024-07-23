const { where } = require('sequelize');
const { Op } = require('sequelize');

const LocalCars = require('../db/models/localcars');

const createLocalCar = async (carData) => {
    return await LocalCars.create(carData);
};

const getCarByID = async (carID) => {
    return await LocalCars.findByPk(carID);
};

const updateCar = async (carData, carID) => {
    const carToUpdate = await getCarByID(carID)
    return await carToUpdate.update(carData);
};



module.exports = {
    createLocalCar,
    getCarByID,
    updateCar
};
