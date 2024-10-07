
const localCarsBidsRepository = require("../repositories/localCarsBids.repository.js");

const ApiError = require('../utils/ApiError.js');


const placeBid = async (req, res, options = {}) => {

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
    const bid = await localCarsBidsRepository.placeBid(bidData)
    if(!bid){
        throw new ApiError(502, "Unable to store the Bid in DB")
    }

    // returning the bid
    return bid

}


module.exports = {
    placeBid
};
