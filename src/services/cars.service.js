const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const ApiError = require('../utils/ApiError')
const logger = require('../utils/logger')
const { getCarsURL } = require('../utils/getCarsURL')
const { carData } = require('../utils/carsData.js')
const { getBidCarByLotID } = require('../repositories/bidCars.repository.js')


const getAllCars = async (req, res) => {
    try {

        var queryParameters = { ...req.query }
        console.log(queryParameters)

        var carsURL = await getCarsURL(queryParameters)

        //return carsURL
    
        const carsRequest = await axiosPrivate.get(carsURL);

        var cars = carsRequest.data.data;

        cars = cars.map((car) => {
            return {
                title: car.title,
                lot_id: car.lot_id,
                vin: car.vin,
                status: car.status,
                location: car.location,
                image: car.link_img_hd[0],
            }
            
        })
        //console.log(carsRequest.data)
        return { 
            cars,
            totalLength: carsRequest.data.size
        };

    } catch (err) {
        console.log(err)
        throw new ApiError(404, "Error while getting the Cars from the API....")
    }
}

const getAllCarsTesting = async (req, res) => {
    try {

        var cars = carData.data
        cars = cars.map((car) => {
            return {
                title: car.title,
                lot_id: car.lot_id,
                vin: car.vin,
                status: car.status,
                location: car.location,
                image: car.link_img_hd[0],
            }
            
        })
        
        return { 
            cars,
            totalLength: 20
        };

    } catch (err) {
        console.log(err)
        throw new ApiError(404, "Error while getting the Cars from the Testing API....")
    }
}

const getCarByLotID = async (req, res) => {

    try{
        const { lotID } = req.query
        // // 'https://api.apicar.store/api/cars/39778890?site=2'
        // const car = await axiosPrivate.get(`/api/cars/${lotID}`);

        const { lot_id } = req.query

        const bidCar = await getBidCarByLotID(lot_id)

        if(!bidCar){

            'https://api.apicar.store/api/cars/39778890?site=2'
            const car = await axiosPrivate.get(`/api/cars/${lot_id}`);
            if(!car){

                throw new ApiError(404, "No data found for car!")
            
            }

            return {...car.data, currentBid: 0, noOfBids: 0}

        }

        // throw new ApiError(404, "No data found for car!")
        if (lotID !== '1249363'){
            throw new ApiError(404, "No data found for car!")
        } 
        bidCar.carDetails = await JSON.parse(bidCar.carDetails)
        const currentBid = bidCar.currentBid
        const noOfBids = bidCar.noOfBids

        return {...bidCar.carDetails, currentBid, noOfBids}

    }catch(err){
        throw new ApiError(404, "Car data not found!")
    }

}

const getCarByLotIDTesting = async (req, res) => {

    try{

        return {...carData.data[0], currentBid: 0, noOfBids: 0}

    }catch(err){
        throw new ApiError(404, "Error while finding testing car!")
    }

}

const carsMakesModels = async (req, res) => {
    try{
        const makesModels = await axiosPrivate.get(`/api/cars/makes-and-models`);
        if(makesModels){
            return makesModels.data
        }

        throw new ApiError(404, "No data found for makes and models!")
    }catch(err){
        throw new ApiError(404, "Error while finding makes and models!")
    }
    
}


module.exports = {
    getAllCars,
    getAllCarsTesting,
    getCarByLotID,
    getCarByLotIDTesting,
    carsMakesModels
}
