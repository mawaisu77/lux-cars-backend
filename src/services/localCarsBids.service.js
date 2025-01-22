const localCarsBidsRepository = require("../repositories/localCarsBids.repository.js");
const localCarsRepository = require("../repositories/localCars.repository.js")
const userRepository = require("../repositories/auth.repository.js")
const { pushNotification } = require("../services/pusher.service.js")
const { bidPlacementLocalCar, newBidOnLocalCar, bidExpirationLocalCar } = require("../utils/pusherNotifications.js")
const CRMService = require("../services/crm.service.js")


const ApiError = require('../utils/ApiError.js');


const placeBid = async (req, res, options = {}) => {

    const bidexpired =  await expireBid(req)
    if(!bidexpired) throw new ApiError(403, "Unable to Expire the recent Active Bid!")

    const updateLocalCar = await updateLocalCarBidData(req)
    if (!updateLocalCar) throw new ApiError(403, "Unable to Update the BidData on LocalCar!")

    const bidSaved = await saveBid(req)
    if(!bidSaved) throw new ApiError(403, "Unable to save the BidData!")

    const title = updateLocalCar.make + " " + updateLocalCar.model
    const carMessage = await newBidOnLocalCar(updateLocalCar.currentBid, updateLocalCar.noOfBids, updateLocalCar.auction_date, req.user.id, req.user.username) 
    const userMessage = await bidPlacementLocalCar(req.body.currentBid, title, updateLocalCar.id)
    
    if(!(bidexpired === parseInt(1))){
        const userMessageExpireBid = await bidExpirationLocalCar(title, updateLocalCar.id)
        pushNotification(bidexpired.userID, userMessageExpireBid, "Bid Expiration", "user-notifications", "public-notification")
    }

    pushNotification(req.query.localCarID, carMessage, "New Bid On Car", "car-notifications", "presence-car")
    pushNotification(req.user.id, userMessage, "Bid Placement", "user-notifications", "public-notification")

    return updateLocalCar
}

const placeBidLive = async (req, res, options = {}) => {

    isBonusTime = false
    const bidexpired =  await expireBid(req)
    if(!bidexpired) throw new ApiError(403, "Unable to Expire the recent Active Bid!")

    const updateLocalCar = await updateLocalCarBidData(req)
    if (!updateLocalCar) throw new ApiError(403, "Unable to Update the BidData on LocalCar!")
    
    // sending new bid to client side
    const carMessage = await newBidOnLocalCar(updateLocalCar.currentBid, updateLocalCar.noOfBids, updateLocalCar.auction_date, req.user.id, req.user.username) 
    pushNotification(req.query.localCarID, carMessage, "New Bid On Car", "car-notifications", "presence-car")


    const bidSaved = await saveBid(req)
    if(!bidSaved) throw new ApiError(403, "Unable to save the BidData!")

    const title = updateLocalCar.make + " " + updateLocalCar.model
    const userMessage = await bidPlacementLocalCar(req.body.currentBid, title, updateLocalCar.id)
    
    if(!(bidexpired === parseInt(1))){
        const userMessageExpireBid = await bidExpirationLocalCar(title, updateLocalCar.id)
        pushNotification(bidexpired.userID, userMessageExpireBid, "Bid Expiration", "user-notifications", "public-notification")
    }

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

        // CRM Note create here for Local Cars Expired Bids
        // let note
        // const type = "ExpireBid"
        // try{
        //     note = await CRMService.createUserCRMContactNotes(bidToExpire.userID, "", bidToExpire.createdAt, bidToExpire.bidPrice, type)
        // }catch(error){
        //     console.log(error.response)
        // }

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
        
        // const auctionDate = new Date(localCar.auction_date);
        // const now = new Date();
        // const diff = auctionDate - now;
        // if (diff > 0 && diff < 10000) { // 10 seconds in milliseconds
        //     auctionDate.setSeconds(auctionDate.getSeconds() + 10);
        //     localCar.auction_date = auctionDate;
        // }
 
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

const schedule = require('node-schedule');
const { pusher } = require('../config/pusher');

var currentCarIndex = 0
var timerDuration = 10000 // 10 seconds
var bonusTime = 10000 // 10 seconds
var biddingActive = true;
var carsForAuctionToday = []
var isBonusTime = true

const printState = async () => {
    console.log("currentCarIndex: ", currentCarIndex )
    console.log("timerDuration: ", timerDuration )
    console.log("bonusTime: ", bonusTime )
    console.log("biddingActive: ", biddingActive )
    console.log("carsForAuctionToday: ", carsForAuctionToday )
    console.log("isBonusTime: ", isBonusTime )
}

const startAuction = async () => {
    printState()
    startTimer()
}



const startTimer = async () => {
    printState()
    let timeLeft = timerDuration;
    const interval = setInterval( async () => {
        if (!biddingActive) {
            clearInterval(interval);
        } else {
            timeLeft -= 1000;
            if (timeLeft <= 0) {
                if (isBonusTime) {
                    clearInterval(interval);
                    isBonusTime = false
                    startTimer()
                }else{
                    await endBidding();
                    clearInterval(interval);
                }

                if(!biddingActive){
                    // Move to the next car if there are more cars
                    if (currentCarIndex < carsForAuctionToday.length - 1) {
                        console.log("next car")
                        isBonusTime = true
                        currentCarIndex++;
                        biddingActive = true
                        startTimer()
                    }
                    else{
                        currentCarIndex = 0
                        timerDuration = 10000 // 10 seconds
                        bonusTime = 10000 // 10 seconds
                        biddingActive = true;
                        carsForAuctionToday = []
                        isBonusTime = true                        
                        console.log("Auction Ended")
                    }

                }

            } else {
                console.log(`Time left for car ${currentCarIndex + 1}: ${timeLeft / 1000} seconds`);
                // Use Pusher to sync the time with clients
                pusher.trigger('live-bidding', 'time-left', { message: { timeLeft: timeLeft / 1000, carIndex: currentCarIndex} });
            }
        }
    }, 1000);
}


// const placeBid = async () => {
//     timerDuration = 10000; // Reset timer to 10 seconds
//     startTimer(); // Restart the timer after a bid is placed
// }


const endBidding = async () => {
    printState()
    biddingActive = false;
    // Trigger event to notify clients that bidding has ended for the current car
    pusher.trigger('live-bidding', 'bidding-ended', { carIndex: currentCarIndex });
}


// checking if the car is in BonusTime
const checkForBonusTime = async () => {
    printState()
    if (isBonusTime) {
        timerDuration += bonusTime;
        isBonusTime = false 
        startTimer(); // Restart the timer with the bonus time
    }
}


// Function to get the current state of the Liveauction
const getCurrentAuctionState = () => {
    return {
        currentCar: carsForAuctionToday[currentCarIndex],
        timeLeft: timerDuration,
        biddingActive
    };
}

// Function to join the Liveauction at any time
const joinAuction = async () => {
    if (biddingActive) {
        // Get the current state of the auction
        const currentState = getCurrentAuctionState();
        // Trigger event to notify the client of the current state
        pusher.trigger('live-bidding', 'join-auction', currentState);
    } else {
        console.log("Auction is not active at the moment.");
    }
}

// Schedule a job to run every Wednesday at 11 am
// 0 11 * * 3
const liveBiddingJob = schedule.scheduleJob('* * * * *', async function(){
    // Your live bidding logic here
    //carsForAuctionToday = await localCarsRepository.getCarsForAuctionToday();
    carsForAuctionToday = [
        {
            title: "Honda City"
        },
        {
            title: "Honda Civic"
        }

    ]

    console.log(`Cars for auction today: ${JSON.stringify(carsForAuctionToday)}`);
    if(carsForAuctionToday.length > 0) startAuction(carsForAuctionToday); // Start the timer initially for the first car
    else console.log("No Cars For Auction Today!")
});


module.exports = {
    placeBid,
    getAllBidsOnLocalCarWithUserDetails,
    getUserAllBids,
    joinAuction,
    liveBiddingJob
};
