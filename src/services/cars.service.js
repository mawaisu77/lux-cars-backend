const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const logger = require('../utils/logger')
const ApiError = require('../utils/ApiError')

const getAllCars = async (req, res) => {
    try {
        var query = {
            limit: 20 || req.query.limit,
            page: 1 || req.query.page,
            make: "Honda",
            model: "2020",
            variant: "Honda Civic 1.5 Turbo RS"
        }

        var url = '/api/cars?'
        var isFirst = true
        for (q in query){
            if (isFirst){
                url = url + q + "=" + `${query[q]}`
                isFirst = false

            }
            else{

                url = url + '&' + q + "=" + `${query[q]}`
            }

        }

        console.log(url)

        // const carsRequest = await axiosPrivate.get(`/api/cars?page=${query.page}&size=${query.limit}`);
        // //const bidCarsRequest = axiosPrivate.get(`/api/cars?page=${query.page}&size=${query.limit}&buy_now=${true}`);
        // //const [carsResponse, bidCarsResponse] = await Promise.all([carsRequest, bidCarsRequest]);
        // const cars = carsRequest.data.data;
        // //console.log(cars)
        // //const bidCars = bidCarsResponse.data.data;
        // //const mixedResponse = shuffleArrays(cars, bidCars);
        // return cars;

    } catch (err) {
        logger.error('ERROR INSIDE GET CARS SERVICE')
        console.log('ERROR INSIDE GET CARS SERVICE')
        throw new ApiError(404, err)
    }
}

const getCarByVIN = async (req, res) => {

    try{
        const { lotID, site } = req.query
        // 'https://api.apicar.store/api/cars/39778890?site=2'
        const car = await axiosPrivate.get(`/api/cars/${lotID}?site=${site}`);
        
        if(car){
            return car.data.data
        }

        throw new ApiError(404, "No data found for car!")
    }catch(err){
        throw new ApiError(404, "Error while finding car data!")
    }

}

const carsMakesModels = async (req, res) => {
    try{
        const makesModels = await axiosPrivate.get(`/api/cars/makes-and-models`);
        if(makesModels){
            return makesModels.data.data
        }

        throw new ApiError(404, "No data found for makes and models!")
    }catch(err){
        throw new ApiError(404, "Error while finding makes and models!")
    }
    
}

module.exports = {
    getAllCars,
    getCarByVIN,
    carsMakesModels
}
