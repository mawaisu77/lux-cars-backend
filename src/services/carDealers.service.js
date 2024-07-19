const dealerRepository = require('../repositories/carDealers.repository');
const { uploadDocuments } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');
const { BOOLEAN } = require('sequelize');


const registerCarDealer = async (req) => {


        // Getting userID
        const userID = 7

        // checking if user already exist as a delaer or not ?
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
        }

        throw new ApiError(403, "Dealer already exist!");
        

}

module.exports = {
    registerCarDealer
}