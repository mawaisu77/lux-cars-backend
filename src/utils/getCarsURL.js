const { query } = require("express")
const { uploadOnCloudinary } = require("../utils/cloudinary.js")
const ApiError = require("./ApiError.js")

const getCarsURL = async (queryParameters) => {

    var carsURL = '/api/cars?'
    var isFirst = true

    for (queries in queryParameters){
        if (Array.isArray(queryParameters[queries])){
            const _query = queryParameters[queries]
            console.log(_query)
            for (q in _query){

                if (isFirst){
                    carsURL = carsURL + queries + "=" + `${_query[q]}`
                    isFirst = false
        
                }
                else{
        
                    carsURL = carsURL + '&' + queries + "=" + `${_query[q]}`
                }

            }

        }else{

            if (isFirst){
                carsURL = carsURL + queries + "=" + `${queryParameters[queries]}`
                isFirst = false
    
            }
            else{
    
                carsURL = carsURL + '&' + queries + "=" + `${queryParameters[queries]}`
            }

        }

    }

    return carsURL

}

module.exports = {
    getCarsURL
}
