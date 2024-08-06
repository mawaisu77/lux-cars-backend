const bidCarsRepository = require('../repositories/bidCars.repository.js');
const ApiError = require('../utils/ApiError.js');
const { saveBid } = require('./bids.service.js');
const { getCarByLotID } = require('./cars.service.js')



const createBidCar = async (req, res) => {
    try {
        // getting data from body
        const { lot_id, currentBid } = req.body

        // checking car against lot_id if already exists
        const isCar = await bidCarsRepository.getBidCarByLotID(lot_id)
        if(isCar){
            throw new ApiError(409, "BidCar already exists!" )
        }

        // add lot_id to query to get the car from Third Party API
        req.query.lot_id = lot_id

        // getting car from third party API using lot_id        
        var carDetails = await getCarByLotID(req)
        if(!carDetails){
            throw new ApiError(404, "Requested car not found!")
        }
        // converting the JSON carData to String
        carDetails = JSON.stringify(carDetails)

        // creating a new bidCar
        var bidCar = await bidCarsRepository.createBidCar({            
            lot_id,
            carDetails,
            currentBid,
        })
        
        bidCar.carDetails = await JSON.parse(bidCar.carDetails)
        return {...bidCar.carDetails, currentBid, noOfBids: 1 }

    } catch (err) {
        //console.log(err)
        throw new ApiError(404, "Error while creating the BidCar....")
    }
}


const updateBidCar = async (req, res) => {

    // getting data from body
    const { lot_id, currentBid } = req.body

    // checking car against lot_id if already exists
    const  bidCar = await bidCarsRepository.getBidCarByLotID(lot_id)
    if(!bidCar){
        throw new ApiError(409, "BidCar does not exists!" )
    }

    // checking if the current bid is less than the coming bid or not
    if(bidCar.currentBid >= currentBid){
        throw new ApiError(403, "Place a higher bid than the existing one!")
    }

    // setting credentials of car to Update
    const carDetails = bidCar.carDetails
    const noOfBids = bidCar.noOfBids + 1
    const bidCarUpdated = {            
        lot_id: lot_id,
        carDetails: carDetails ,
        currentBid: currentBid,
        noOfBids: noOfBids
    }

    // updating the car
    const updatedBidCar = await bidCarsRepository.updateBidCar(bidCarUpdated)
    updatedBidCar.carDetails = await JSON.parse(updatedBidCar.carDetails)

    return {...updatedBidCar.carDetails, currentBid, noOfBids}


}

const placeBid = async (req, res) => {

    // checking the users documents are verified or not 
    if(!req.user.documentVerified){
        throw new ApiError(403, "Please submit the required documents to place the Bid")
    }

    // getting data from body
    const { lot_id } = req.body

    // checking car against lot_id if already exists
    const isCar = await bidCarsRepository.getBidCarByLotID(lot_id)
    var car = {}

    if(isCar){
        car = await updateBidCar(req)
    }
    else{
        car = await createBidCar(req)
    }

    await saveBid(req)

    return car

}


module.exports = {
    createBidCar,
    updateBidCar,
    placeBid
}