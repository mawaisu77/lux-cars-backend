const { axiosPrivate } = require('../utils/axiosPrivate.js')
const { shuffleArrays } = require('../utils/helperFunctions.js')
const authRepository = require('../repositories/auth.repository.js');
const logger = require('../utils/logger.js');
const localCarsOffersRepository = require('../repositories/localCarsOffersRepository.repository.js');
const { uploadDocs } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const createOffer = async (req, res) => {
    const {localCarID, offerPrice} = req.body
    const userID = req.user.id

    if (!localCarID) throw new ApiError(400, "LocalCarID in required!")
    if (!offerPrice) throw new ApiError(400, "OfferPrice is required!")
    if (!userID) throw new ApiError(400, "Unable to get the UserID")

    const offerData = {
        localCarID: localCarID,
        offerPrice: offerPrice,
        userID: userID
    }

    const offer = await localCarsOffersRepository.createOffer(offerData)
    if(!offer) throw new ApiError(500, "Error in creating the Offer!")

    return offer

}

const carsAllOffers = async (req, res) => {
    const carID = req.query.id
    if(!carID) throw new ApiError(400, "CarID in required!")
    const offers = await localCarsOffersRepository.carsAllOffers(carID)

    return offers
}

module.exports = {
    createOffer,
    carsAllOffers
}