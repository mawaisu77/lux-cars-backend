const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const dealerRepository = require('../repositories/carDealers.repository');
const logger = require('../utils/logger');
const localCarsRepository = require('../repositories/localCars.repository.js');
const { uploadDocs } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const uploadCar = async (req, res) => {
try{     // Uplaoding car images
        const carImages = await uploadDocs(req)

        // Getting userID
        const userID = req.user.id
        console.log("3rd")

        // Preparing CarData 
        const carData = {...req.body, userID, carImages}
        console.log("car data", carData)
        // Sending Car to database
        const car = await localCarsRepository.createLocalCar(carData)
        console.log("5th")

        return car

    } catch (err) {
        throw new ApiError(404, err)
        logger.error('ERROR INSIDE uploadCar SERVICE')
        console.log('ERROR INSIDE uploadCar SERVICE')
    }
}

const getCarByID = async (req, res) => {
    try{
        const car = await localCarsRepository.getCarByID(req.query.id)
        if (!car){
            throw new ApiError(404, "Car does not exists.")
        }

        return car
    }
    catch(err){
        throw new ApiError(404, err)
    }
}


const updateCar = async (req, res) => {
    try {

        // getting car from database
        const car = await localCarsRepository.getCarByID(req.query.id)
        if (!car){
            throw new ApiError(404, "Car does not exists.")
        }

        // Uplaoding car images
        var carImages = []
        if (req.files && !(req.files.length === 0)){
            carImages = await uploadDocs(req)
        }else{
            carImages = car.carImages
        }

        // Getting userID
        const userID = req.user.id

        // Preparing CarData 
        const carData = {...req.body, userID, carImages}

        // Updating CarData
        const UpdatedCar = await localCarsRepository.updateCar(carData, req.query.id)
        return UpdatedCar

    } catch (err) {
        throw new ApiError(404, err)
    }
}

const getAllLocalCars = async (req, res) => {
    try{
        const localCars = await localCarsRepository.getAllLocalCars(req.user.id)
        if (localCars){
            return localCars
        }

        throw new ApiError(404, "No cars found!")

    }catch(err){
        throw new ApiError(404, "Server Error in finding user's LocalCars")
    }
}


module.exports = {
    uploadCar,
    getCarByID,
    updateCar,
    getAllLocalCars
}