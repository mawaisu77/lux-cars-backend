const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const ApiError = require('../utils/ApiError')
const logger = require('../utils/logger')
const { getCarsURL } = require('../utils/getCarsURL')
const { carData } = require('../utils/carsData.js')
const { getBidCarByLotID } = require('../repositories/bidCars.repository.js')
const { mapCarDetails } = require('../utils/carDetailsMap.js')

const getAllLatestCars = async (req, res) => {
    // ... existing code ...

    let cars = [];
    let page = 1; // Start from the first page
    let size = 20
    let carsRequest;

    while (true) { // {{ edit_1 }}
        var queryParameters = { ...req.query, size, page }
        console.log(queryParameters)
        
        // Construct the URL with the current page
        const carsURL = await getCarsURL(queryParameters); // Ensure to include the page in the query
        console.log(carsURL)
        // getting the cars from the API
        carsRequest = await axiosPrivate.get(carsURL);
        cars = carsRequest.data.data.filter(car => new Date(car.auction_date) > new Date()); // Filter for future auction dates

        if (cars.length === size) { // If cars are found, exit the loop
            break;
        }

        page++; // Increment the page for the next attempt
    }

    // mapping to the required format
    cars = await mapCarDetails(cars)

    // returning the cars and the total length of the cars
    return { 
        cars,
        totalLength: carsRequest.data.count // Update totalLength to reflect the number of cars found
    };
}

const getAllCars = async (req, res) => {

    var queryParameters = { ...req.query }

    
    var carsURL = await getCarsURL(queryParameters)

    // getting the cars from the API
    const carsRequest = await axiosPrivate.get(carsURL);
    var cars = carsRequest.data.data;

    // mapping the cars to the required format
    cars = await mapCarDetails(cars)

    // returning the cars and the total length of the cars
    return { 
        cars,
        totalLength: carsRequest.data.count
    };
}

const getAllCarsTesting = async (req, res) => {

    // getting the cars from the carData
    console.log(req.query)

    // mapping the cars to the required format
    var cars = carData.data
    cars = await mapCarDetails(cars)

    // returning the cars and the total length of the cars
    return { 
        cars,
        totalLength: 20
    };

}

const getCarsByLotIDs = async (lot_ids) => {
    let cars = [];
    for (let i = 0; i < lot_ids.length; i++) {
        try {
            // Check for the car in bidCars first
            const bidCar = await getBidCarByLotID(lot_ids[i]);

            if (bidCar) {
                cars.push(bidCar.carDetails); // Assuming carDetails contains the required car data
            } else {
                // If not found in bidCars, then hit the API
                const car = await axiosPrivate.get(`/api/cars/${lot_ids[i]}`);
                if (car && car.data) {
                    cars.push(car.data);
                }
            }
        } catch (error) {
            continue;
        }
    }

    // mapping the cars to the required format
    cars = await mapCarDetails(cars)

    return cars;
}


const getCarByLotID = async (req, res) => {

    // getting the lotID from the query parameters
    const { lot_id } = req.query

    // getting the bidCar from the bidCars repository
    const bidCar = await getBidCarByLotID(lot_id)

    // if the bidCar is not found then getting the car from the API
    if(!bidCar){
        try{

            // 'https://api.apicar.store/api/cars/39778890?site=2'
            const car = await axiosPrivate.get(`/api/cars/${lot_id}`);
            if(!car){

                throw new ApiError(404, "No data found for car!")
            
            }

            // returning the car and the current bid and the number of bids
            return {...car.data, currentBid: 0, noOfBids: 0}

        }catch(error){
            throw new ApiError(404, "No data found for car!")
        }

    }

    // converting the JSON carDetails to String
    bidCar.carDetails = await JSON.parse(bidCar.carDetails)

    // getting the current bid and the number of bids
    const currentBid = bidCar.currentBid
    const noOfBids = bidCar.noOfBids

    // returning the car and the current bid and the number of bids
    return {...bidCar.carDetails, currentBid, noOfBids}

}

const getCarByLotIDTesting = async (req, res) => {

    // returning the car and the current bid and the number of bids
    return {...carData.data[1], currentBid: 0, noOfBids: 0}

}

const carsMakesModels = async (req, res) => {

    // getting the makes and models from the API
    const makesModels = await axiosPrivate.get(`/api/cars/makes-and-models`);
    if(makesModels){
        return makesModels.data
    }

    // returning the makes and models
    return makesModels.data
}

const getHistoryCars = async (req, res) => {
    const { make, model } = req.query

    // 'https://api.apicar.store/api/history-cars?make=Acura&model=CSX'
    let cars = await axiosPrivate.get(`/api/history-cars?make=${make}&model=${model}`);

    // mapping the cars to the required format
    cars = await mapCarDetails(cars.data.data)

    return { cars }



}

module.exports = {
    getAllCars,
    getAllLatestCars,
    getAllCarsTesting,
    getCarByLotID,
    getCarByLotIDTesting,
    carsMakesModels,
    getCarsByLotIDs,
    getHistoryCars
}
