const bidCarsRepository = require('../repositories/bidCars.repository.js');
const ApiError = require('../utils/ApiError.js');
const { saveBid, expireBid, checkUserCanBid } = require('./bids.service.js');
const { addFundsToUser, removeFundsFromUser } = require('../services/funds.service.js')
const { getCarByLotID } = require('./cars.service.js')
const sequelize = require('../config/database.js');
const { mapCarDetails } = require('../utils/carDetailsMap.js');


const filterBidCars = async(query, limitInt, offsetInt, bidCars) => {

    console.log(query)

    const filteredBidCars = bidCars.filter(bidCar => {
        const carDetails = JSON.parse(bidCar.carDetails); // Parse the carDetails string
        // Check if each query parameter matches the carDetails
        return Object.entries(query).every(([key, value]) => {
            // Ensure the key exists in carDetails before comparing
            if (carDetails.hasOwnProperty(key.replace('_from', '').replace('_to', ''))) {
                // Log the key and value for debugging
                console.log(`Checking key: ${key}, value: ${value}, carValue: ${carDetails[key.replace('_from', '').replace('_to', '')]}`);
                
                // Check for range if key ends with _from or _to
                if (key.endsWith('_from')) {
                    if(key.replace('_from', '') === "auction_date"){
                        const carValue = new Date(carDetails[key.replace('_from', '')]);
                        const queryDate = new Date(value);
                        return carValue >= queryDate; 
                    }
                    const carValue = parseFloat(carDetails[key.replace('_from', '')]);
                    return carValue >= value; // Check if carValue is greater than or equal to the from value
                } else if (key.endsWith('_to')) {
                    if(key.replace('_to', '') === "auction_date"){
                        const carValue = new Date(carDetails[key.replace('_to', '')]);
                        const queryDate = new Date(value);
                        return carValue <= queryDate; 
                    }
                    const carValue = parseFloat(carDetails[key.replace('_to', '')]);
                    return carValue <= value; // Check if carValue is less than or equal to the to value
                }

                // Check if carDetails[key] is not null before calling toString()
                if (carDetails[key] !== null) {
                    return carDetails[key].toString() === value.toString(); // Regular comparison
                }   
                return false         
            }
            return false; // Key does not exist
        })
    })

    // Apply pagination to the filtered results
    const paginatedBidCars = filteredBidCars.slice(offsetInt, offsetInt + limitInt).map(bidCar => {
        const carDetail = JSON.parse(bidCar.carDetails);
        const { id, current_bid, currentBid, noOfBids, ...carDetails } = carDetail;
        bidCar.dataValues.carDetails = ""
        return {
            ...bidCar.dataValues,
            ...carDetails // Parse carDetails to JSON
        };
    });
    var cars = await mapCarDetails(paginatedBidCars)
    return  { 
        cars: cars, 
        totalLength: filteredBidCars.length
    } ; // Return paginated results
}


const findBidCars = async(req, res) => {
    const {size = 10, page = 1, ...query} = {...req.query}

    //Convert limit and page to integers
    const limitInt = parseInt(size, 10);
    const pageInt = parseInt(page, 10);
    const offsetInt = (pageInt - 1) * limitInt; // Calculate offset

    // Fetching bid cars from the database using the constructed query and pagination
    const bidCars = await bidCarsRepository.findBidCars();
    if (!bidCars || bidCars.length === 0) {
        throw new ApiError(404, "No bid cars found matching the criteria");
    }

    const cars = await filterBidCars(query, limitInt, offsetInt, bidCars)

    return cars 
}


const createBidCar = async (req, res, options = {}) => {
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

    const auction_date = (carDetails.auction_date)

    // converting the JSON carData to String
    carDetails = JSON.stringify(carDetails)

    // creating a new bidCar
    var bidCar = await bidCarsRepository.createBidCar({            
        lot_id,
        carDetails,
        currentBid,
        auction_date
    }, options)

    // if the bidCar is not created then throwing an error
    if(!bidCar){
        throw new ApiError(404, "Error while creating the BidCar....")
    }

    // converting the JSON carData to String
    bidCar.carDetails = await JSON.parse(bidCar.carDetails)

    // returning the created bidCar
    return {...bidCar.carDetails, currentBid, noOfBids: 1 }

}


const updateBidCar = async (req, res, options = {}) => {


    // getting data from body
    const { lot_id, currentBid } = req.body

    // checking car against lot_id if already exists
    const  bidCar = await bidCarsRepository.getBidCarByLotID(lot_id)
    if(!bidCar){
        throw new ApiError(409, "BidCar does not exists!" )
    }

    // checking if the current bid is less than the coming bid or not
    if(bidCar.currentBid > currentBid || bidCar.currentBid === currentBid){
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
    const updatedBidCar = await bidCarsRepository.updateBidCar(bidCarUpdated, options)
    updatedBidCar.carDetails = await JSON.parse(updatedBidCar.carDetails)

    // returning the updated car
    return {...updatedBidCar.carDetails, currentBid, noOfBids}


}


const placeBid = async (req, res, options = {}) => {

    // checking the users documents are verified or not 
    if(!req.user.documentVerified || req.user.documentVerificationStatus !== 'approved'){
        throw new ApiError(403, "Your document verification is pending")
    }

    // checking if the user can bid or not
    const canBid = await checkUserCanBid(req)
    if(!canBid){
        throw new ApiError(403, "You have insufficient funds to place the Bid")
    }

    // getting data from body
    const { lot_id } = req.body
    console.log(req.body)

    // checking car against lot_id if already exists
    const isCar = await bidCarsRepository.getBidCarByLotID(lot_id)

    var car = {}


    // if the car already exists then updating the bidCar 
    // if the car does not exists then creating a new bidCar
    if(isCar){
        // creating a transaction
        const transaction = await sequelize.transaction();

        try{
            // updating the bidCar // sequelize transaction
            car = await updateBidCar(req, { transaction: transaction })

            // expiring the old bid // sequelize transaction    
            const bidToExpire = await expireBid(req, { transaction: transaction })
            if(!bidToExpire){
                throw new ApiError(404, "Error in expiring the old bid!")
            }

            // adding the funds of expired bid back to the userFunds // sequelize transaction   
            const addFunds = await addFundsToUser(bidToExpire.userID, bidToExpire.bidPrice, { transaction: transaction })
            if(!addFunds){
                throw new ApiError(404, "Error in adding the funds!")
            }

            // saving the new bid // sequelize transaction
            const bidToSave = await saveBid(req, { transaction: transaction })
            if(!bidToSave){
                throw new ApiError(404, "Error in saving the bid!")
            }

            // removing the funds of new bid from the userFunds // sequelize transaction    
            const removeFunds = await removeFundsFromUser(bidToSave.userID, bidToSave.bidPrice, { transaction: transaction })
            if(!removeFunds){
                throw new ApiError(404, "Error in removing the funds!")
            }

            await transaction.commit()

        }
        catch(error){
            await transaction.rollback()
            throw new ApiError(404, error.message)
        }

    }
    else{

        const transaction = await sequelize.transaction();
        try{
            
            // creating a new bidCar // sequelize transaction
            car = await createBidCar(req, { transaction: transaction })

            // saving the new bid // sequelize transaction
            const bidToSave = await saveBid(req, { transaction: transaction })
            if(!bidToSave){
                throw new ApiError(404, "Error in saving the bid!")
            }

            // removing the funds of new bid from the userFunds // sequelize transaction        
            const removeFunds = await removeFundsFromUser(bidToSave.userID, bidToSave.bidPrice, { transaction: transaction })
            if(!removeFunds){
                throw new ApiError(404, "Error in removing the funds!")
            }

            // commiting the transaction on success
            await transaction.commit()

        }
        catch(error){
            // rolling back the transaction on error
            await transaction.rollback()
            throw new ApiError(404, error.message)
        }

    }

    return car

}


const getAllBidCarsByAdmin = async () => {
    const cars = await bidCarsRepository.findAllCars();
    if (!cars) {
        throw new ApiError(404, "Cars not found");
    }
    return cars;
};

const getCarDetailsByLotID = async (lot_id) => {
  const car = await bidCarsRepository.getBidCarByLotID(lot_id);
  if (!car) {
    throw new ApiError(404, "Car not found");
  }
  return car;
};

module.exports = {
  createBidCar,
  updateBidCar,
  placeBid,
  findBidCars,
  getAllBidCarsByAdmin,
  getCarDetailsByLotID
};
