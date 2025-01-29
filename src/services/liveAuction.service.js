const localCarsRepository = require("../repositories/localCars.repository.js");

const { pushNotification } = require("../services/pusher.service.js")
const { bidPlacementLocalCar, newBidOnLocalCar, bidExpirationLocalCar } = require("../utils/pusherNotifications.js")
const ApiError = require("../utils/ApiError");


const schedule = require('node-schedule');
const { pusher } = require('../config/pusher');
const time = 30000
var currentCarIndex = 0
var timerDuration = time // 10 seconds
var bonusTime = time // 10 seconds
var biddingActive = true;
var carsForAuctionToday = []
var isBonusTime = true
var isLiveAuction = false
var timeLeft = 0

const getTime = async () => {
    return time 
}
const setIsBonusTime = async (value) => {
    isBonusTime = value
}

const setTimeLeft = async (value) => {
    timeLeft = value
}

const updateCurrentBidData = async (bidPrice) => {
    carsForAuctionToday[currentCarIndex].currentBid = bidPrice
    carsForAuctionToday[currentCarIndex].noOfBids += 1
}

const placeBidLive = async (req, res, options = {}) => {

    isBonusTime = false
    const bidexpired =  await expireBid(req)
    if(!bidexpired) throw new ApiError(403, "Unable to Expire the recent Active Bid!")

    const updateLocalCar = await updateLocalCarBidData(req)
    if (!updateLocalCar) throw new ApiError(403, "Unable to Update the BidData on LocalCar!")
    
    // sending new bid to client side
    const carMessage = await newBidOnLocalCar(updateLocalCar.currentBid, updateLocalCar.noOfBids, updateLocalCar.auction_date, req.user.id, req.user.username) 
    pushNotification("", carMessage, "New Bid On Car", "new-bid", "presence-live-auction")


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
    // console.log("currentCarIndex: ", currentCarIndex )
    // console.log("timerDuration: ", timerDuration )
    // console.log("bonusTime: ", bonusTime )
    // console.log("biddingActive: ", biddingActive )
    // console.log("carsForAuctionToday: ", carsForAuctionToday )
    // console.log("isBonusTime: ", isBonusTime )
}

const startAuction = async () => {
    startTimer()
}



const startTimer = async () => {
    isLiveAuction = true
    timeLeft = timerDuration;
    let exit = false
    const interval = setInterval( async () => {
        if (!biddingActive) {
            clearInterval(interval);
        } else {
            timeLeft -= 1000;
            if (timeLeft <= 0) {
                if (isBonusTime) {
                    await assignBonusTime()
                    clearInterval(interval);
                    exit = true
                    return
                }else{
                    await endBidding();
                    clearInterval(interval);
                    if(!biddingActive){
                        // Move to the next car if there are more cars
                        if (currentCarIndex < carsForAuctionToday.length - 1) {
                            console.log("next car")
                            await moveToNextCar()
                            exit = true
                            return
                        }
                        else{
                            currentCarIndex++
                            await endAucion()
                            clearInterval(interval);
                            exit = true
                            return
                        }
                    }

                }

            } else {
                console.log(`Time left for car ${currentCarIndex + 1}: ${timeLeft / 1000} seconds`);
            }
        }
    }, 1000);

    if(exit){
        return
    }
}


// const placeBid = async () => {
//     timerDuration = 10000; // Reset timer to 10 seconds
//     startTimer(); // Restart the timer after a bid is placed
// }

const endAucion = async () => {
    pushNotification("", {
        auctionCompleted: "Today's Auction is Complete, Thanks"
    }, "Auction-completed-on-car-list", "auction-completed", "presence-live-auction")
    currentCarIndex = 0
    timerDuration = time // 10 seconds
    bonusTime = time // 10 seconds
    biddingActive = true;
    carsForAuctionToday = []
    isBonusTime = true     
    isLiveAuction = false   
    timeLeft = 0                
    console.log("Auction Ended")
}

const moveToNextCar = async () => {
    isBonusTime = true
    currentCarIndex++;
    biddingActive = true
    startTimer()
}

const assignBonusTime = async () => {
    isBonusTime = false
    try{
        pushNotification("", {
            bonusTime: "true"
        }, "Bonus Time Added", "bonus-time", "presence-live-auction")
    }catch(error){
        console.log(error)
    }

    startTimer()
}


// End the bid on a specific Car
const endBidding = async () => {

    biddingActive = false;
    pushNotification("", {
        endAucion: "true",
        message: "Auction completed on this Car"
    }, "Auction-end-on-car", "end-auction", "presence-live-auction")
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
const getCurrentAuctionState = async () => {
    return {
        car: carsForAuctionToday[currentCarIndex]
    }
    
}

// Function to join the LiveAuction at any time
const joinAuction = async () => {
    if (isLiveAuction) {
        // Get the current state of the auction
        const currentState = await getCurrentAuctionState();
        // Trigger event to notify the client of the current state
        //pusher.trigger('live-bidding', 'join-auction', currentState);
        if (currentState == {}) throw new ApiError(404, "Auction is not active at the moment!") 
        return currentState
    } else {
        console.log("Auction is not active at the moment.");
        throw new ApiError(404, "Auction is not active at the moment!") 
    }
}


const liveCarListData = async(req, res ) => {
    return carsForAuctionToday.slice(currentCarIndex);
}



// Schedule a job to run every Wednesday at 11 am
// 0 11 * * 3

const liveBiddingJob = schedule.scheduleJob('0 11 * * 3', async function(){
    // console.log("Live bidding job runs every 6 minutes.");
    // Your live bidding logic here
    carsForAuctionToday = (await localCarsRepository.getAllCars()).slice(0, 3);

    // carsForAuctionToday = [
    //     {
    //         title: "Honda City"
    //     },
    //     {
    //         title: "Honda Civic"
    //     }
    // ]
    //console.log(`Cars for auction today: ${JSON.stringify(carsForAuctionToday)}`);
    if(carsForAuctionToday.length > 0) await startAuction(carsForAuctionToday); // Start the timer initially for the first car
    else console.log("No Cars For Auction Today!")
});

liveBiddingJob.invoke();

const updateLiveCarListData = async(req, res ) => {
    pusher.trigger('car-list-channel', 'updateCar', { message: { id: "05a82864-e6b1-4f83-9bba-13d07119e25b", currentBid: 1000, status: "Auction-Ended"} });
    return "Notification Sent"
}




module.exports = {
    joinAuction,
    updateLiveCarListData,
    liveCarListData,
    liveBiddingJob,
    updateCurrentBidData,
    setIsBonusTime,
    setTimeLeft,
    getTime

}

// channel = car-list-channel
// notificationName = updateCar => message = {
//     id: "",
//     currentBid: 0,
//     status: ""
// } 


// biddingOver
// bonusTime

