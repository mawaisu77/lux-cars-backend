const { axiosPrivate } = require('../utils/axiosPrivate')
const ApiError = require('../utils/ApiError')
const { getCarsURL } = require('../utils/getCarsURL')
const { carData } = require('../utils/carsData.js')
const { getBidCarByLotID } = require('../repositories/bidCars.repository.js')
const { mapCarDetails } = require('../utils/carDetailsMap.js')

const getALLCategoriesVehichleCount = async(req, res) => {
    const vehicleTypeOptions = [
        { id: "automobile", label: "Automobile" },
        { id: "motorcycle", label: "Motorcycle" },
        { id: "atv", label: "ATV" },
        { id: "watercraft", label: "Watercraft" },
        { id: "jet_sky", label: "Jet Sky" },
        { id: "boat", label: "Boat" },
        { id: "trailers", label: "Trailers" },
        { id: "mobile_home", label: "Mobile Home" },
        { id: "emergency_equipment", label: "Emergency Equipment" },
        { id: "industrial_equipment", label: "Industrial Equipment" },
        { id: "truck", label: "Truck" },
        { id: "bus", label: "Bus" },
        { id: "other", label: "Other" },
    ];
    const vehicleCounts = await Promise.all(vehicleTypeOptions.map(async (vehicleType) => {
        const queryParameters = { vehicle_type: vehicleType.id };
        const carsURL = await getCarsURL(queryParameters);
        const response = await axiosPrivate.get(carsURL);
        return { label: vehicleType.label, count: response.data.count };
    }));

    //Reduce to accumulate the results into an object
    const vehicleCountData = vehicleCounts.reduce((acc, curr) => {
        acc[curr.label] = { 
            label: curr.label,
            count: curr.count
        };
        return acc;
    }, {});

    return vehicleCountData;

}

const getAllLatestCars = async (req, res) => {
    // ... existing code ...

    let cars = [];
    let page = 1; // Start from the first page
    let size = 20
    let carsRequest;

    while (true) { // {{ edit_1 }}
        var queryParameters = { ...req.query, size, page }
        //console.log(queryParameters)
        
        // Construct the URL with the current page
        const carsURL = await getCarsURL(queryParameters); // Ensure to include the page in the query
        //console.log(carsURL)
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
    //console.log(req.query)

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
            var bidCar = await getBidCarByLotID(lot_ids[i]);

            if (bidCar) {
                // converting the JSON carDetails to String
                bidCar.carDetails = await JSON.parse(bidCar.carDetails)

                // getting the current bid and the number of bids
                bidCar.carDetails.currentBid = bidCar.currentBid
                bidCar.carDetails.noOfBids = bidCar.noOfBids
                cars.push(bidCar.carDetails); 
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

const getSyncedCarByLotID = async(req, res) => {

    // getting the lotID from the query parameters
    const { lot_id } = req.query

    let car

    if (lot_id.length === 17) {
        try{
            car = await axiosPrivate.get(`/api/cars/vin/all?vin=${lot_id}`);
            if(car.data){
                car = car.data[0];
            }
        }catch(error){
            console.log("Failed to fetch car by VIN:", error);
        }

    }else{
        // First, try to get the car from the API
        try{
            car = await axiosPrivate.get(`/api/cars/${lot_id}`);
            if(car.data){
                car = car.data;
            }
        }catch(error){
            console.log("Failed to fetch car by Lot ID:", error);
        }

    }
    // Then, check for the bidCar
    const bidCar = await getCarByLotID(req, res);

    // If bidCar is found, append its currentBid and noOfBids to the car data
    if (bidCar && car) {
        car.currentBid = bidCar.currentBid;
        car.noOfBids = bidCar.noOfBids;
    }else if (car && !bidCar) {
        car.currentBid = 0
        car.noOfBids = 0
    }else if (!car && bidCar) {
        car = bidCar
    }else if (!car && !bidCar) {
        throw new ApiError(404, "No data found for car!")
    }

    const {make, model, year} = car
    const estimatedPrice = await calculateEstimatedPriceForTheVehicle(make, model, year)
    car.estimatedPrice = estimatedPrice.estimatedPrice
    car.estimatedPricesRange = estimatedPrice.estimatedPricesRange

    return car;

}

const getCarByLotID = async (req, res) => {

    // getting the lotID from the query parameters
    const { lot_id } = req.query

    // getting the bidCar from the bidCars repository
    let bidCar = await getBidCarByLotID(lot_id)
    if(bidCar){
        // converting the JSON carDetails to String
        bidCar.carDetails = await JSON.parse(bidCar.carDetails)

        // getting the current bid and the number of bids
        const currentBid = bidCar.currentBid
        const noOfBids = bidCar.noOfBids

        // returning the car and the current bid and the number of bids
        return {...bidCar.carDetails, currentBid, noOfBids}
    }else{
        return null
    }

}

const getCarByVIN = async (req, res) => {

    const { VIN } = req.query
    // https://api.apicar.store/api/cars/vin/all
    try{

        const car = await axiosPrivate.get(`/api/cars/vin/all?vin=${VIN}`);
        if(!car){

            throw new ApiError(404, "No data found for car!")
        
        }

        return car.data

    }catch(error){
        console.log(error)
        throw new ApiError(404, "No data found for car!")
    }
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

const getHistoryCarsData = async (make, model, year, size = 30) => {

    const year_from = parseInt(year)
    const year_to = parseInt(year)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const auction_date_from = oneYearAgo.toISOString().split('T')[0];

    // 'https://api.apicar.store/api/history-cars?make=Acura&model=CSX'
    try{
    let cars = await axiosPrivate.get(`/api/history-cars?make=${make}&model=${model}&year_from=${year_from}&year_to=${year_to}&size=${size}&auction_date_from=${auction_date_from}`);

        // mapping the cars to the required format
        cars = await mapCarDetails(cars.data.data)

        return cars

    }catch(error){
        console.log(error)
        return []
    }   

}

const getHistoryCars = async (req, res) => {

    const { make, model, year, size = 10} = req.query
    let cars = await getHistoryCarsData(make, model, year, size)

    cars = cars.slice(0, 8)

    return cars

}

const calculateEstimatedPriceForTheVehicle = async (make, model, year) => {


    let cars = await getHistoryCarsData(make, model, year)

    // calculating the average purchase price
    let purchasePrices = cars.map((car) => {
        if (car.sale_history && car.sale_history.length > 0) {
            return car.sale_history[0].purchase_price
        }else{
            return 0
        }
    });
    //console.log(purchasePrices)
    let sortedPurchasePrices = purchasePrices.sort((a, b) => a - b);
    let minPurchasePrice = Math.floor(sortedPurchasePrices.slice(0, 15).reduce((acc, curr) => acc + curr, 0) / 15);
    let maxPurchasePrice = Math.floor(sortedPurchasePrices.slice(-15).reduce((acc, curr) => acc + curr, 0) / 15);
    let totalPurchasePrice = purchasePrices.reduce((acc, curr) => acc + curr, 0);
    let estimatedPrice = Math.floor(totalPurchasePrice / purchasePrices.length);
    const estimatedPricesRange = `${minPurchasePrice} - ${maxPurchasePrice}`;

    return {
        estimatedPricesRange,
        estimatedPrice
    }
}

const getSalesHistory = async (req, res) => {
    const { lot_id } = req.query
    if(!lot_id) throw new ApiError(404, "Lot_Id of the Car is required!")
    try {
        const car = await axiosPrivate.get(`/api/sale-histories/lot-id?lot_id=${lot_id}`)
        return car.data.data[0].sale_history
    } catch (error) {
        throw new ApiError(401, error.message)
    }
}



module.exports = {
    getAllCars,
    getAllLatestCars,
    getAllCarsTesting,
    getCarByLotID,
    getCarByVIN,
    getSyncedCarByLotID,
    getCarByLotIDTesting,
    carsMakesModels,
    getCarsByLotIDs,
    getHistoryCars,
    getALLCategoriesVehichleCount,
    calculateEstimatedPriceForTheVehicle,
    getSalesHistory
}
