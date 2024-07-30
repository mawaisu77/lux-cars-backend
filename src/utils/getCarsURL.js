const { uploadOnCloudinary } = require("../utils/cloudinary.js")
const ApiError = require("./ApiError.js")

const getCarsURL = async (queryParameters) => {

    var carsURL = '/api/cars?'
    var isFirst = true

    for (query in queryParameters){
        
        if (isFirst){
            carsURL = carsURL + query + "=" + `${queryParameters[query]}`
            isFirst = false

        }
        else{

            carsURL = carsURL + '&' + query + "=" + `${queryParameters[query]}`
        }

    }

    return carsURL

}

module.exports = {
    getCarsURL
}
