const bidsRepository = require('../repositories/bids.repository.js');
const ApiError = require('../utils/ApiError.js');



const saveBid = async (req, res) => {

    const { lot_id, currentBid } = req.body    
    const userID = req.user.id

    const bidData = {
        userID: userID,
        lot_id: lot_id,
        bidPrice: currentBid
    }

    const bidToExpire = await expireBid(req)
    if(!bidToExpire){
        throw new ApiError(404, "Error in expiring the old bid!")
    }

    const bid = await bidsRepository.saveBid(bidData)
    if(!bid){
        throw new ApiError(502, "Unable to store the Bid in DB")
    }

    return bid

}

const expireBid = async(req, res) => {

    const lot_it = req.body.lot_id
    const bidToExpire = await bidsRepository.getBidToExpireByLotID(lot_it)

    bidToExpire.isValid = false

    bidToExpire.save()


    return bidToExpire 
}


module.exports = {
    saveBid,
    expireBid
}