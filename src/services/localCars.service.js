const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const dealerRepository = require('../repositories/carDealers.repository');
const logger = require('../utils/logger');
const localCarsRepository = require('../repositories/localCars.repository.js');
const { uploadDocuments } = require('../utils/uplaodDocument.js')


const uploadCar = async (req, res) => {
    try {

        // Uplaoding car images
        const carImages = await uploadDocuments(req)

        // Getting userID
        const userID = 1
        console.log(userID)

        // Preparing CarData 
        const carData = {...req.body, userID, carImages}

        // Sending Car to database
        const car = await localCarsRepository.createLocalCar(carData)
        return car

    } catch (err) {
        logger.error('ERROR INSIDE uploadCar SERVICE')
        console.log('ERROR INSIDE uploadCar SERVICE')
    }
}

const updateCar = async (req, res) => {
    try {
        // Uplaoding car images
        const carImages = await uploadDocuments(req)

        // Getting userID
        const userID = 1
        console.log(userID)

        // Preparing CarData 
        var carData = req.body
        carData = {...req.body, userID, carImages}
        console.log(carData)
        const car = await localCarsRepository.createLocalCar(carData)
        return car

    } catch (err) {
        console.log(err)
    }
}






module.exports = {
    uploadCar
}