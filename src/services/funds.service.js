const { axiosPrivate } = require('../utils/axiosPrivate')
const ApiError = require('../utils/ApiError')
const  bidsPackages  = require('../utils/bidPackagesConfig.js')
const  fundsRepository  = require('../repositories/funds.repository.js')


const addFunds = async (req, res) => {
    const userID = req.user.id
    const package = req.body.package
    const packages = bidsPackages.bidPackages
    console.log(packages)
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

module.exports = {
    addFunds
}
