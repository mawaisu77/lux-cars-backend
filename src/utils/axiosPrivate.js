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

const axiosClearVin = axios.create({
    baseURL: process.env.CLEARVIN_BASE_URL,
});

axiosClearVin.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    function (error) {
        throw new ApiError(404, "Data not found!")
    }
);

const axiosCRM = axios.create({
    baseURL: process.env.CRM_BASE_URL,
});

axiosCRM.interceptors.request.use(
    function (config) {
        const bearerToken = process.env.CRM_BEARER_TOKEN; // Add this line
        config.headers['Authorization'] = `Bearer ${bearerToken}`; // Add this line
        config.headers['Content-Type'] = 'application/json';
        //config.headers['Version'] = '2021-07-28'
        return config;

    },
    function (error) {
        throw new ApiError(404, "Data not found!")
    }
);

module.exports = { axiosPrivate, axiosClearVin, axiosCRM };