const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const savedCarsRepository = require('../repositories/savedCarsRepository.repository.js');
const carService = require('./cars.service.js')
const { uploadDocuments } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const saveLocalCar = async (req, res) => {
    const userID = req.user.id;
    if(!req.body.localCarsID) throw new ApiError(401, "LocalCarsID Required!")
    const localCarsID = req.body.localCarsID.toString() 

    const existingCar = await savedCarsRepository.getUsersSavedCars(userID);
    console.log(existingCar)
    if (existingCar) {
        // If the user already has a saved car, update the localCarsID array
        // Ensure localCarsID is unique before pushing
        if(existingCar.localCarsID != null){
            if (!existingCar.localCarsID.includes(localCarsID)) {
                let carArray = existingCar.localCarsID
                existingCar.localCarsID = [...carArray, localCarsID]
                await existingCar.save();
            }
            return existingCar;
        }else{
            let carArray = []
            carArray.push(localCarsID)
            existingCar.localCarsID = carArray
            await existingCar.save();

            return existingCar;
        }

    } else {
        // If the user does not have a saved car, create a new record
        const newCar = await savedCarsRepository.saveCar({ userID, localCarsID: [localCarsID] });
        return newCar;
    }
}

const saveCar = async (req, res) => {

    const userID = req.user.id;
    if(!req.body.lot_id) throw new ApiError(401, "Lot_ID Required!")
    const lotID = req.body.lot_id.toString() 

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
    if(!req.body.lot_id) throw new ApiError(401, "Lot_ID Required!")
    const lotID = req.body.lot_id.toString() 

    let savedCars = await savedCarsRepository.getUsersSavedCars(userID);
    if (savedCars) {
        if (savedCars.lot_id.includes(lotID)) {
            savedCars.lot_id = savedCars.lot_id.filter(id => id !== lotID);
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
    if (!userID) throw new ApiError(401, "User does not exist against the provied UserID")
    const savedCarsLots = await savedCarsRepository.getUsersSavedCars(userID);
    var savedCars = []
    if (!savedCarsLots) return savedCars
    savedCars = await carService.getCarsByLotIDs(savedCarsLots.lot_id)
    return savedCars
}

const getCarDetailsByLotID = async(req, lot_id) => {
    req.query.lot_id = lot_id;
    const carDetails = await carService.getCarByLotID(req);
    return carDetails
}

const getUsersSavedCarsIDs = async (req) => {
    const userID = req.user.id;
    if (!userID) throw new ApiError(401, "User does not exist against the provied UserID")
    const savedCarsLots = await savedCarsRepository.getUsersSavedCars(userID);
    var savedCars = []
    if (!savedCarsLots) return savedCars
    return savedCarsLots.lot_id
}



module.exports = {
    saveCar,
    saveLocalCar,
    deleteCar,
    getUsersSavedCars,
    getUsersSavedCarsIDs
}