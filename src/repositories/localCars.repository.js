const { where } = require('sequelize');
const { Op } = require('sequelize');

const LocalCars = require('../db/models/localcars');

const createLocalCar = async (carData) => {
    // saving the car data to the database
    return await LocalCars.create(carData);
};

const getCarByID = async (carID) => {
    // getting the car data from the database
    return await LocalCars.findByPk(carID);
};

const updateCar = async (carData, carID) => {
    // getting the car data from the database
    const carToUpdate = await getCarByID(carID)
    // updating the car data
    return await carToUpdate.update(carData);
};

const getUserAllLocalCars = async (id) => {
    // getting all the cars from the database
    return await LocalCars.findAll({where : { userID: id }})
}

const getAllUnApprovedLocalCars = async () => {
    return await LocalCars.findAll({where : { status: "UnApproved" }})
}

const getAllApprovedLocalCars = async () => {
    return await LocalCars.findAll({where : { status: "Approved" }})
}

module.exports = {
    createLocalCar,
    getCarByID,
    updateCar,
    getUserAllLocalCars,
    getAllUnApprovedLocalCars,
    getAllApprovedLocalCars
};
