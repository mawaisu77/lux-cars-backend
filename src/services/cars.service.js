const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const ApiError = require('../utils/ApiError')
const logger = require('../utils/logger')
const { getCarsURL } = require('../utils/getCarsURL')
const { carData } = require('../utils/carsData.js')
const { getBidCarByLotID } = require('../repositories/bidCars.repository.js')

const getAllCars = async (req, res) => {
    try {
        // var queryParameters = { ...req.query }

        // const carsURL = await getCarsURL(queryParameters)
    
        // const carsRequest = await axiosPrivate.get(carsURL);

        // const cars = carsRequest.data.data;

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
        
        return cars;

    } catch (err) {
        throw new ApiError(404, "Error while getting the Cars from the API....")
    }
}

const getCarByLotID = async (req, res) => {

    try{

        const { lot_id } = req.query

        const bidCar = await getBidCarByLotID(lotID)

        if(!bidCar){

            'https://api.apicar.store/api/cars/39778890?site=2'
            const car = await axiosPrivate.get(`/api/cars/${lotID}`);
            if(!car){

                throw new ApiError(404, "No data found for car!")
            
            }

            return {...car.data, currentBid: 0, noOfBids: 0}

        }

        bidCar.carDetails = await JSON.parse(bidCar.carDetails)
        const currentBid = bidCar.currentBid
        const noOfBids = bidCar.noOfBids

        return {...bidCar.carDetails, currentBid, noOfBids}

        // console.log(lotID)
        // return carData.data[0]

    }catch(err){
        throw new ApiError(404, err)
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
    getCarByLotID,
    carsMakesModels
}
