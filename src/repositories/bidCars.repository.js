const { where } = require("sequelize");
const { Op } = require("sequelize");

const BidCars = require('../db/models/bidcars');

const findBidCars = async (query, limit, offset) => {
  // Fetch all bid cars from the database
  const bidCars = await BidCars.findAll();

  // Filter the results based on the query
  // Filter the results based on the query
  const filteredBidCars = bidCars.filter(bidCar => {
    const carDetails = JSON.parse(bidCar.carDetails); // Parse the carDetails string
    // Check if each query parameter matches the carDetails
    return Object.entries(query).every(([key, value]) => {
        // Ensure the key exists in carDetails before comparing
        if (carDetails.hasOwnProperty(key)) {
            // Check for range if value is an object with from and/or to
            if (typeof value === 'object') {
                const carValue = parseFloat(carDetails[key]);
                const fromCheck = value.from != undefined ? carValue >= value.from : true; // Check from if defined
                const toCheck = value.to != undefined ? carValue <= value.to : true; // Check to if defined
                return fromCheck && toCheck; // Return true if both checks pass
            }
            return carDetails[key].toString() === value.toString(); // Regular comparison
        }
        return false; // Key does not exist
    });
});

  // Apply pagination to the filtered results
  const paginatedBidCars = filteredBidCars.slice(offset, offset + limit).map(bidCar => {
    const carDetail = JSON.parse(bidCar.carDetails)
    const {currentBid, noOfBids, ...carDetails} = carDetail
    return {
        ...bidCar.dataValues,
        carDetails: carDetails // Parse carDetails to JSON
    };
});
  return paginatedBidCars; // Return the paginated filtered results
}


const createBidCar = async (bidCarData, options = {}) => {
  return await BidCars.create(bidCarData, options);
};

const getBidCarByLotID = async (lotID) => {
  return await BidCars.findOne({ where: { lot_id: lotID } });
};

const updateBidCar = async (bidCarData, options = {}) => {
  const bidCarToUpdate = await getBidCarByLotID(bidCarData.lot_id);
  return await bidCarToUpdate.update(bidCarData, options);
};

const findAllCars = async () => {
  return await BidCars.findAll();
};

module.exports = {
  createBidCar,
  getBidCarByLotID,
  updateBidCar,
  findAllCars,
  findBidCars
};
