const { where } = require('sequelize');
const { Op } = require('sequelize');

const savedCars = require('../db/models/savedcars');

const saveCar = async (carData) => {
    // saving the car data to the database
    return await savedCars.create(carData);
};

const getUsersSavedCars = async(userID) => {
    const userSavedCars = await savedCars.findOne({
        where: {
            userID: userID
        }
    });
    return userSavedCars
}



module.exports = {
    saveCar,
    getUsersSavedCars
};
