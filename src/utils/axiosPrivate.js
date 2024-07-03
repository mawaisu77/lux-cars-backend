const axios = require('axios')
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
        return Promise.reject(error);
    }
);
module.exports = { axiosPrivate };