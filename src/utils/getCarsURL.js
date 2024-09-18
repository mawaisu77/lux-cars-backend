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
                    carsURL = carsURL + queries + "=" + `${encodeURIComponent(_query[q])}`
                    isFirst = false
                }
                else{
        
                    carsURL = carsURL + '&' + queries + "=" + `${encodeURIComponent(_query[q])}`
                }
            }
        }else{
            if (isFirst){
                carsURL = carsURL + queries + "=" + `${encodeURIComponent(queryParameters[queries])}`
                isFirst = false
            }
            else{
    
                carsURL = carsURL + '&' + queries + "=" + `${encodeURIComponent(queryParameters[queries])}`
            }
        }
    }
    console.log((carsURL))
    return carsURL
}
module.exports = {
    getCarsURL
}