const fundsRepository = require('../repositories/funds.repository.js');
const bidCarsRepository = require('../repositories/bidCars.repository.js');
const bidsRepository = require("../repositories/bids.repository.js");
const authRepository = require("../repositories/auth.repository.js");
const userService = require("../services/user.service.js");
const ApiError = require('../utils/ApiError.js');
const moment = require('moment');


const saveBid = async (req, res, options = {}) => {

    // getting info from the request
    const { lot_id, currentBid } = req.body
    const userID = req.user.id

    // creating the bid object to be saved
    const bidData = {
        userID: userID,
        lot_id: lot_id,
        bidPrice: currentBid,
    }

    // saving the bid in the DB
    const bid = await bidsRepository.saveBid(bidData, options)
    if(!bid){
        throw new ApiError(502, "Unable to store the Bid in DB")
    }

    // returning the bid
    return bid

}


const getAllBidsOfUser = async (req) => {
    // getting the user ID from the request
    const userID = req.user.id
    // getting all the bids of the user     
    const bidsOfUser = await bidsRepository.getAllBidsOfUser(userID)
    // getting the details of the respective car of each bid
    const bidsWithCarDetails = await Promise.all(bidsOfUser.map(async (bid) => {
        var carDetails = await bidCarsRepository.getBidCarByLotID(bid.lot_id)
        carDetails = JSON.parse(carDetails.carDetails)
        carDetails = {
            title: carDetails.title,
            lot_id: carDetails.lot_id,
            vin: carDetails.vin,
            status: carDetails.status,
            location: carDetails.location,
            base_site:carDetails.base_site,
            auction_date:carDetails.auction_date,
            vehicle_type:carDetails.vehicle_type,
            image: carDetails.link_img_hd[0] || null,
        }
        return {
            // attaching the car details to the bid object
            ...bid.dataValues, carDetails
        }
    }))
    return bidsWithCarDetails
}

const expireBid = async(req, res, options = {}) => {

    // getting the bid to expire
    const lot_it = req.body.lot_id
    const bidToExpire = await bidsRepository.getBidToExpireByLotID(lot_it)

    if (bidToExpire != null){    

        // setting the bid as invalid
        bidToExpire.isValid = false

        // saving the bid
        const expiredBid = await bidToExpire.save(options)
        if(!expiredBid){ 
            throw new ApiError(502, "Unable to expire the bid in DB")
        }

        // returning the expired bid
        return expiredBid

    }

    return 1
}


const checkUserCanBid = async (req, res) => {
    // getting the user ID from the request
    const userID = req.user.id
    // getting the current bid from the request
    const { currentBid } = req.body
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userID);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }
    // checking if the user has enough funds
    const hasEnoughFunds = userFunds.avalaibleBidAmount >= currentBid;
    
    // checking if the user has available bids
    const hasAvailableBids = userFunds.avalaibleBids > 0;

    // checking if the user can bid today
    const canBidToday = await checkUserCanBidToday(userID)

    if (!canBidToday) {
        throw new ApiError(400, 'User already has an active bid today!');
    }

    // checking if the user has enough funds
    if (!hasEnoughFunds) {
        throw new ApiError(400, 'Insufficient funds to place this bid');
    }
    // checking if the user has available bids
    if (!hasAvailableBids) {
        throw new ApiError(400, 'No available bids left');
    }

    // returning true if the user can bid
    return true;
}


const checkUserCanBidToday = async (userId) => {
    // getting the user active bids
    const activeBids = await bidsRepository.getUserActiveBids(userId);

    // checking if the user has active bids
    if (activeBids.length > 0) {
        // getting the latest bid date
        const latestBidDate = Math.max(...activeBids.map(bid => new Date(bid.createdAt)));
        // getting the date one day ago
        const oneDayAgo = moment().subtract(1, 'days').toDate();
        // checking if the latest bid date is less than one day ago
        return latestBidDate < oneDayAgo;
    }
    return true;
};


const getBidsOnCar = async (lot_id) => {
    const bidsOnCar = await bidsRepository.findAllBidsOnCar(lot_id);
    const bidsOnCarData = await Promise.all(
        bidsOnCar.map(async (bid) => {
        const userId = bid.userID;
        const user = await userService.getUserProfile(userId);
        console.log("user", user);

        return {
            username: user.username,
            email: user.email,
            phone: user.phone,
            profilePicture: user.profilePicture,
            bid,
        };
    }));
    if (!bidsOnCar) {
        throw new ApiError(404, "No Bids found");
    }
    return bidsOnCarData;
};

const getBidsOfUserByAdmin = async (userId) => {
    const bidsOfUser = await bidsRepository.findAllBidsByUser(userId);
    if (!bidsOfUser) {
        throw new ApiError(404, "No Bids found");
    }
    return bidsOfUser;
};

const getUserByBidIdByAdmin = async (bidID) => {
    const bid = await bidsRepository.findUserByBidId(bidID);
    const userId = bid.userID;

    const user = await authRepository.findUserById(userId);
    if (!user) {
        throw new ApiError(404, "user not found");
    }
    return user;
};

const getBidsByBidId = async (bidId) => {
    const bid = await bidsRepository.findUserByBidId(bidId);
    if (!bid) {
      throw new ApiError(404, "bid not found");
    }
    return bid;
};


module.exports = {
    saveBid,
    expireBid,
    getAllBidsOfUser,
    checkUserCanBid,
    checkUserCanBidToday,
    getBidsOnCar,
    getBidsByBidId,
    getBidsOfUserByAdmin,
    getUserByBidIdByAdmin,
};
