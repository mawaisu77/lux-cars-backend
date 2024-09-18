const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const savedCarsRepository = require('../repositories/savedCarsRepository.repository.js');
const carService = require('./cars.service.js')
const { uploadDocuments } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const saveCar = async (req, res) => {

    const userID = req.user.id;
    const lotID = req.body.lot_id;
    const existingCar = await savedCarsRepository.getUsersSavedCars(userID);
    if (existingCar) {
        // If the user already has a saved car, update the lot_id array
        // Ensure lot_id is unique before pushing
        if (!existingCar.lot_id.includes(lotID)) {
            let carArray = existingCar.lot_id
            existingCar.lot_id = [...carArray, lotID]
            await existingCar.save();
        }
        return existingCar;
    } else {
        // If the user does not have a saved car, create a new record
        const newCar = await savedCarsRepository.saveCar({ userID, lot_id: [lotID] });
        return newCar;
    }
    

}

const deleteCar = async (req, res) => {
    const userID = req.user.id;
    const lotID = req.body.lot_id;

    const savedCars = await savedCarsRepository.getUsersSavedCars({ userID });
    if (savedCars) {
        // If the user has a saved car, remove the lot_id from the array
        const index = savedCars.lot_id.indexOf(lotID);
        if (index !== -1) {
            savedCars.lot_id.splice(index, 1);
            await savedCars.save();
            return savedCars;
        } else {
            throw new ApiError(404, "Car not found in saved cars.");
        }
    } else {
        throw new ApiError(404, "No saved cars found for this user.");
    }
}

const getUsersSavedCars = async (req, res) => {
    const userID = req.user.id;
    const savedCarsLots = await savedCarsRepository.getUsersSavedCars(userID);
    const savedCars = await carService.getCarsByLotIDs(savedCarsLots.lot_id)
    return savedCars
}

const getCarDetailsByLotID = async(req, lot_id) => {
    req.query.lot_id = lot_id;
    const carDetails = await carService.getCarByLotID(req);
    return carDetails
}



module.exports = {
    saveCar,
    deleteCar,
    getUsersSavedCars
}