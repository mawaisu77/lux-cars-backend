
const localCarsBidsRepository = require("../repositories/localCarsBids.repository.js");
const localCarsRepository = require("../repositories/localCars.repository.js")
const userRepository = require("../repositories/auth.repository.js")

const ApiError = require('../utils/ApiError.js');


const placeBid = async (req, res, options = {}) => {

    const updateLocalCar = await updateLocalCarBidData(req)
    if (!updateLocalCar) throw new ApiError(403, "Unable to Update the BidData on LocalCar!")

    const bidSaved = await saveBid(req)
    if(!bidSaved) throw new ApiError(403, "Unable to save the BidData!")

    const bidexpired =  await expireBid(req)
    if(!bidexpired) throw new ApiError(403, "Unable to Expire the recent Active Bid!")

    return updateLocalCar
}

const saveBid = async (req, res) => {

    // getting info from the request
    const { localCarID, currentBid } = req.body
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
    const localCarID = req.body.localCarID

    var bidToExpire = await localCarsBidsRepository.getActiveBidByLocalCarID(localCarID)
    console.log(bidToExpire)
    if (bidToExpire) {

        bidToExpire.isValid = false
        const expiredBid = await bidToExpire.save()
        if (!expiredBid){
            throw new ApiError(502, "Unable to expire the bid in DB")
        }
        return expireBid

    }

    return 1
}

const updateLocalCarBidData = async (req, res) => {

    const { localCarID, currentBid } = req.body

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
             username: userDetails.username,
            email: userDetails.email,
            // add more user details as needed
        }
        return {
            // attaching the user details to the bid object
            bid: bid.dataValues, userDetails
        }
    }))
    return bidsWithUserDetails
}




module.exports = {
    placeBid,
    getAllBidsOnLocalCarWithUserDetails
};
