const dealerRepository = require('../repositories/carDealers.repository');
const { uploadDocuments } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const registerCarDealer = async (req, res) => {

    try{

        // Getting userID
        console.log(req.user)
        const userID = req.user.id
console.log("user id ===========================",userID)
        // checking if user already exist as a dealer or not ?
        const isDealer = await dealerRepository.getDealerByUserID(userID)

        if(!isDealer){

            // Uplaoding DealerShip Liecence
            let dealershipLicense = await uploadDocuments(req)
            dealershipLicense = dealershipLicense[0]

            // Preparing dealerData 
            const dealerData = {...req.body, dealershipLicense, userID}

            // Sending dealer to database
            const dealer = await dealerRepository.registerCarDealer(dealerData)
            return dealer

        }else{

            throw new ApiError(401, "Dealer Already Exists!")
        
        }

    }catch(err){

        console.log(err)
        throw new ApiError(404, err)
        
    }

}

const getDealerByUserID = async (req, res) => {


    try{
        const carDealer = await dealerRepository.getDealerByUserID(req.user.id)
        if (!carDealer){
            throw new ApiError(404, "Car Dealer does not exists.")
        }

        return carDealer
    }
    catch(err){
        throw new ApiError(404, err)
    }
}

const updateCarDealer = async (req, res) => {

    try{

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
            dealershipLicense = await uploadDocuments(req)
            dealershipLicense = dealershipLicense[0]
        }else{
            dealershipLicense = dealer.dealershipLicense
        }

        // Preparing dealerData 
        const dealerData = {...req.body, dealershipLicense, userID}

        // Sending dealer to database
        const updatedDealer = await dealerRepository.updateCarDealer(dealerData)
        return updatedDealer


    }catch(err){

        throw new ApiError(404, err)
        
    }

}


module.exports = {
    registerCarDealer,
    getDealerByUserID,
    updateCarDealer
}