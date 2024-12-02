const localCarsBidsRepository = require("../repositories/localCarsBids.repository.js");
const localCarsRepository = require("../repositories/localCars.repository.js")
const userRepository = require("../repositories/auth.repository.js")
const { pushNotification } = require("../services/pusher.service.js")
const { bidPlacementLocalCar, newBidOnCar, bidExpirationLocalCar } = require("../utils/pusherNotifications.js")


const ApiError = require('../utils/ApiError.js');


const placeBid = async (req, res, options = {}) => {

    const bidexpired =  await expireBid(req)
    if(!bidexpired) throw new ApiError(403, "Unable to Expire the recent Active Bid!")

    const updateLocalCar = await updateLocalCarBidData(req)
    if (!updateLocalCar) throw new ApiError(403, "Unable to Update the BidData on LocalCar!")

    const bidSaved = await saveBid(req)
    if(!bidSaved) throw new ApiError(403, "Unable to save the BidData!")

    const title = updateLocalCar.make + " " + updateLocalCar.model
    const carMessage = await newBidOnCar(updateLocalCar.currentBid, updateLocalCar.id, updateLocalCar.noOfBids) 
    const userMessage = await bidPlacementLocalCar(req.body.currentBid, title, updateLocalCar.id)
    
    if(!(bidexpired === parseInt(1))){
        const userMessageExpireBid = await bidExpirationLocalCar(title, updateLocalCar.id)
        pushNotification(bidexpired.userID, userMessageExpireBid, "Bid Expiration", "user-notifications", "public-notification")
    }

    pushNotification(req.query.localCarID, carMessage, "New Bid On Car", "car-notifications", "presence-car")
    pushNotification(req.user.id, userMessage, "Bid Placement", "user-notifications", "public-notification")

    return updateLocalCar
}

const saveBid = async (req, res) => {

    // getting info from the request
    const { currentBid } = req.body
    const { localCarID } = req.query
    const userID = req.user.id

    // creating the bid object to be saved
    const bidData = {
        userID: userID,
        localCarID: localCarID,
        bidPrice: currentBid,
    }

    // saving the bid in the DB
    const bid = await localCarsBidsRepository.saveBid(bidData)
    if(!bid){
        throw new ApiError(502, "Unable to store the Bid in DB")
    }

    // returning the bid
    return bid

}

const expireBid = async (req, res) => {
    const localCarID = req.query.localCarID

    var bidToExpire = await localCarsBidsRepository.getActiveBidByLocalCarID(localCarID)
    //console.log(bidToExpire)
    if (bidToExpire) {

        bidToExpire.isValid = false
        const expiredBid = await bidToExpire.save()
        if (!expiredBid){
            throw new ApiError(502, "Unable to expire the bid in DB")
        }
        return bidToExpire

    }

    return 1
}

const updateLocalCarBidData = async (req, res) => {

    const { currentBid } = req.body
    const { localCarID } = req.query

    var localCar = await localCarsRepository.getCarByID(localCarID)
    if (!localCar) throw new ApiError(404, "No Local Car found against the provided ID!")

    if (localCar.currentBid < currentBid){
        localCar.currentBid = currentBid
        localCar.noOfBids += 1
    
        const updateLocalCar = await localCar.save()
        if(!updateLocalCar) throw new ApiError(403, "Unable to Update the BidData on LocalCar!")
        return updateLocalCar

    }else{
        throw new ApiError(403, "Place a higher bid than the existing one!")
    }
}

const getAllBidsOnLocalCarWithUserDetails = async (req, res) => {
    // getting all the bids on the local car
    const localCarID = req.query.localCarID
    const bidsOnLocalCar = await localCarsBidsRepository.getAllBidsOnLocalCar(localCarID)
    if (!bidsOnLocalCar) {
        throw new ApiError(404, "No bids found on local car")
    }

    // getting the details of the respective user of each bid
    const bidsWithUserDetails = await Promise.all(bidsOnLocalCar.map(async (bid) => {
        var userDetails = await userRepository.findUserById(bid.userID)
        if (!userDetails) {
            throw new ApiError(404, "User not found for bid")
        }
        userDetails = {
            userID: userDetails.id,
            username: userDetails.username,
            email: userDetails.email,
            profilePicture: userDetails.profilePicture
            // add more user details as needed
        }
        return {
            // attaching the user details to the bid object
            bid: bid.dataValues, userDetails
        }
    }))
    
    // Sort bids by creation date (assuming bid has a 'createdAt' field)
    bidsWithUserDetails.sort((a, b) => new Date(b.bid.createdAt) - new Date(a.bid.createdAt));
    return bidsWithUserDetails
}

const getUserAllBids = async (req, res) => {
    const userID = req.user.id
    if (!userID) throw new ApiError(401, "User ID is required!")
    const userBids = await localCarsBidsRepository.getAllBidsOfUser(userID)
    if (!userBids) return []
    const userBidsWithCarDetails = await Promise.all(userBids.map(async (bid) => {
        var carDetails = await localCarsRepository.getCarByID(bid.localCarID)
        if (carDetails){
            carDetails = {
                title: carDetails.make + " " + carDetails.model + " " + carDetails.year,
                vin: carDetails.vin,
                location: carDetails.carLocation + " " + carDetails.carState,
                auction_date: carDetails.auction_date,
                image: carDetails.carImages || null,
                currentBid: carDetails.currentBid,
                noOfBids: carDetails.noOfBids
            }
            return {
                ...bid.dataValues, carDetails
            }
        }else{
            return null
        }
    }))
    return userBidsWithCarDetails
}




module.exports = {
    placeBid,
    getAllBidsOnLocalCarWithUserDetails,
    getUserAllBids
};
