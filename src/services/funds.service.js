const { axiosPrivate } = require('../utils/axiosPrivate')
const ApiError = require('../utils/ApiError')
const  bidsPackages  = require('../utils/bidPackagesConfig.js')
const  fundsRepository  = require('../repositories/funds.repository.js')


const addFunds = async (req, res) => {
        // getting the user ID from the request
    const userID = req.user.id
    const userFunds = await fundsRepository.getUserFunds(userID)

    if(!userFunds){

        // getting the package from the request
        const package = req.body.package

        // getting the packages from the bidPackagesConfig
        const packages = bidsPackages.bidPackages

        // adding the funds to the user
        const funds = await fundsRepository.addFunds({
            userID: userID,
            totalDeposits: packages[package].deposit,
            avalaibleBidAmount: packages[package].bidAmount,
            usedBidAmount: 0,
            avalaibleBids: packages[package].noOfActiveBids,
            activeBids: 0
        })
        // returning the funds
        return funds
        
    }
    else{

        // getting the package from the request
        const package = req.body.package

        // getting the packages from the bidPackagesConfig
        const packages = bidsPackages.bidPackages

        // adding the funds to the user
        userFunds.totalDeposits = packages[package].deposit,
        userFunds.avalaibleBidAmount = packages[package].bidAmount - userFunds.usedBidAmount,
        userFunds.avalaibleBids = packages[package].noOfActiveBids - userFunds.activeBids,
        await userFunds.save()

        // returning the funds
        return userFunds

    }


}

const addFundsToUser = async (userId, amount, options = {}) => {
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userId);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }

    // adding the funds to the user
    userFunds.avalaibleBidAmount += amount;
    userFunds.usedBidAmount -= amount;
    userFunds.activeBids -= 1;
    userFunds.avalaibleBids += 1;

    // saving the funds to the database
    return await userFunds.save(options);
}

const removeFundsFromUser = async (userId, amount, options = {}) => {
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userId);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }

    // checking if the user has enough funds
    if (userFunds.avalaibleBidAmount < amount) {
        throw new ApiError(400, 'Insufficient funds');
    }

    // removing the funds from the user
    userFunds.avalaibleBidAmount -= amount;
    userFunds.usedBidAmount += amount;
    userFunds.activeBids += 1;
    userFunds.avalaibleBids -= 1;
    
    // saving the funds to the database
    return await userFunds.save(options);
}


const getUserFunds = async (req, res) => {
    // getting the user ID from the request
    const userID = req.user.id;
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userID);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }
    // returning the user funds
    return userFunds;
}



module.exports = {
    addFunds,
    getUserFunds,
    addFundsToUser,
    removeFundsFromUser
}