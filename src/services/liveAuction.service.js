
const schedule = require('node-schedule');
const { pusher } = require('../config/pusher');

var currentCarIndex = 0
var timerDuration = 10000 // 10 seconds
var bonusTime = 10000 // 10 seconds
var biddingActive = true;
var carsForAuctionToday = []
var isBonusTime = true
var isLiveAuction = false

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
                        isLiveAuction = true                   
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
    if (isLiveAuction) {
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
// 


const updateLiveCarListData = async(req, res ) => {
    pusher.trigger('car-list-channel', 'updateCar', { message: { id: "05a82864-e6b1-4f83-9bba-13d07119e25b", currentBid: 1000, status: "Auction-Ended"} });
    return "Notification Sent"
}







module.exports = {
    joinAuction,
    updateLiveCarListData,
//    liveBiddingJob
}

// channel = car-list-channel
// notificationName = updateCar => message = {
//     id: "",
//     currentBid: 0,
//     status: ""
// } 


