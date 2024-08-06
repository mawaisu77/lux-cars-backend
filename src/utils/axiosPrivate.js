const axios = require('axios');
const ApiError = require('./ApiError');
const axiosPrivate = axios.create({
    baseURL: process.env.BASE_URL,
});

axiosPrivate.interceptors.request.use(
    function (config) {
        const apiKey = process.env.API_KEY;
        config.headers['api-key'] = `${apiKey}`;
        return config;
    },
    function (error) {
        // Handle the error
        throw new ApiError(404, "Data not found!")
    }
); 

// axiosPrivate.interceptors.response.use(
//     function (response) {
//         // If the response is successful, return the response
//         return response;
//     },
//     function (error) {
//         //if (error.response && error.response.status === 404) {
//             // If the response status is 404, throw a custom ApiError
//         return []
//         //}
//         // Handle other errors
//         return Promise.reject(error);
//     }
// );


module.exports = { axiosPrivate };