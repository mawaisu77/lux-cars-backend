const { axiosPrivate } = require('../utils/axiosPrivate')
const ApiError = require('../utils/ApiError')
const  bidsPackages  = require('../utils/bidPackagesConfig.js')
const  fundsRepository  = require('../repositories/funds.repository.js')


const addFunds = async (req, res) => {
    const userID = req.user.id
    const package = req.body.package
    const packages = bidsPackages.bidPackages

    const funds = await fundsRepository.addFunds({
        userID: userID,
        totalDeposits: packages[package].deposit,
        avalaibleBidAmount: packages[package].bidAmount,
        usedBidAmount: 0,
        avalaibleBids: packages[package].noOfActiveBids,
        activeBids: 0
    })

    return funds

}


const updateFunds = async (req, res) => {
    console.log("updateFunds...................")
    const { currentBid, expiredBidPrice , operation, user } = req.body; // 'add' or 'remove'
    var userID = null
    var userFunds = null
    if(user){
        userFunds = await fundsRepository.getUserFunds(user);
    }
    else{
        userID = req.user.id
        userFunds = await fundsRepository.getUserFunds(userID);
    }

    if (operation === 'add') {
        userFunds.avalaibleBidAmount = userFunds.avalaibleBidAmount + expiredBidPrice;
        userFunds.usedBidAmount = userFunds.usedBidAmount - expiredBidPrice;
        userFunds.activeBids = userFunds.activeBids - 1
        userFunds.avalaibleBids = userFunds.avalaibleBids + 1
        const updatedFunds = await userFunds.save()
        return updatedFunds;    

    } else if (operation === 'remove') {

        if (userFunds.avalaibleBidAmount < currentBid) {
            throw new ApiError(400, 'Insufficient funds');
        }

        userFunds.avalaibleBidAmount = userFunds.avalaibleBidAmount - currentBid;
        userFunds.usedBidAmount = userFunds.usedBidAmount + currentBid;
        userFunds.activeBids = userFunds.activeBids + 1
        userFunds.avalaibleBids = userFunds.avalaibleBids - 1
        const updatedFunds = await userFunds.save()
        return updatedFunds;

    } else {
        throw new ApiError(400, 'Invalid operation');
    }
}


const getUserFunds = async (req, res) => {
    const userID = req.user.id;
    const userFunds = await fundsRepository.getUserFunds(userID);
    
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }
    
    return userFunds;
}


const checkUserCanBid = async (req, res) => {

    const userID = req.user.id
    const { currentBid } = req.body
    const userFunds = await fundsRepository.getUserFunds(userID);
    
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }

    const hasEnoughFunds = userFunds.avalaibleBidAmount >= currentBid;
    const hasAvailableBids = userFunds.avalaibleBids > 0;

    if (!hasEnoughFunds) {
        throw new ApiError(400, 'Insufficient funds to place this bid');
    }

    if (!hasAvailableBids) {
        throw new ApiError(400, 'No available bids left');
    }

    return true;
}



module.exports = {
    addFunds,
    getUserFunds,
    updateFunds,
    checkUserCanBid
}