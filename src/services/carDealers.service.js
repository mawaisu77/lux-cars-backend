const dealerRepository = require('../repositories/carDealers.repository');
const { uploadDocs } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const registerCarDealer = async (req, res) => {

    // Getting userID
    const userID = req.user.id

    // checking if user already exist as a dealer or not ?
    const isDealer = await dealerRepository.getDealerByUserID(userID)

    if(!isDealer){

        // Uplaoding DealerShip Liecence
        let dealershipLicense = await uploadDocs(req)
        dealershipLicense = dealershipLicense[0]

        // Preparing dealerData 
        const dealerData = {...req.body, dealershipLicense, userID}

        // Sending dealer to database
        const dealer = await dealerRepository.registerCarDealer(dealerData)
        return dealer

    }else{

        throw new ApiError(401, "Dealer Already Exists!")
    
    }   

}

const getDealerByUserID = async (req, res) => {

    // Getting the dealer by userID
    const carDealer = await dealerRepository.getDealerByUserID(req.user.id)
    if (!carDealer){
        throw new ApiError(404, "Car Dealer does not exists.")
    }

    return carDealer
}

const updateCarDealer = async (req, res) => {

    // Getting userID
    const userID = req.user.id

    // checking if user already exist as a dealer or not ?
    const dealer = await dealerRepository.getDealerByUserID(userID)
    if (!dealer){
        throw new ApiError(404, "Dealer does not exists.")
    }

    // Uplaoding car DealerShip
    var dealershipLicense = ""
    if (req.files && !(req.files.length === 0)){
        dealershipLicense = await uploadDocs(req)
        dealershipLicense = dealershipLicense[0]
    }else{
        dealershipLicense = dealer.dealershipLicense
    }

    // Preparing dealerData 
    const dealerData = {...req.body, dealershipLicense, userID}

    // Sending dealer to database
    const updatedDealer = await dealerRepository.updateCarDealer(dealerData)
    return updatedDealer

}


module.exports = {
    registerCarDealer,
    getDealerByUserID,
    updateCarDealer
}