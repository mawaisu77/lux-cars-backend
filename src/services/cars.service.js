const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const logger = require('../utils/logger')

const getAllCars = async (req, res) => {
    try {
        const query = {
            limit: 8
        }
        if (req.query.page)
            query.page = req.query.page

        const carsRequest = axiosPrivate.get(`/api/cars?page=${query.page}&size=${query.limit}`);
        const bidCarsRequest = axiosPrivate.get(`/api/cars?page=${query.page}&size=${query.limit}&buy_now=${true}`);
        const [carsResponse, bidCarsResponse] = await Promise.all([carsRequest, bidCarsRequest]);
        const cars = carsResponse.data.data;
        const bidCars = bidCarsResponse.data.data;
        const mixedResponse = shuffleArrays(cars, bidCars);
        return mixedResponse;

    } catch (err) {
        logger.error('ERROR INSIDE GET CARS SERVICE')
        console.log('ERROR INSIDE GET CARS SERVICE')
    }
}
module.exports = {
    getAllCars
}