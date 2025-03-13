const { axiosClearVin } = require('../utils/axiosPrivate')
const  ApiError  = require('../utils/ApiError')
const axios = require('axios')


const getCarPreview = async (req, res) => {

    try {
        const vin = req.query.vin
        // /rest/vendor/preview?vin=KNDJD733865514567
        const response = await axiosClearVin.get(`/rest/vendor/preview?vin=${vin}`)
        return response.data

    } catch (error) {
        throw new ApiError(404, error.message)
    }

}

const getCarReportPDF = async (req, res) => {

    const vin = req.query.vin
    let response;
    try{
        // /rest/vendor/report?vin=KNDJD733865514567&format=pdf&reportTemplate=2021
        response = await axiosClearVin.get(`/rest/vendor/report?vin=${vin}&format=pdf&reportTemplate=2021`, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${currentToken}`
            }
        })

    }catch(error){
        //console.log(error)
        throw new ApiError(404, "No data found against this Car!", error)
    }

   
    // Set appropriate headers for PDF file
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="car_report_${vin}.pdf"`)

    // Send the PDF buffer data as the response
    return response.data

}

const getCarReportHTML = async (req, res) => {

    const vin = req.query.vin
    let response;
    try{
        // /rest/vendor/report?vin=KNDJD733865514567&format=html&reportTemplate=2021
        response = await axiosClearVin.get(`/rest/vendor/report?vin=${vin}&format=html&reportTemplate=2021`)

    }catch(error){
        throw new ApiError(404, "No data found against this Car!")
    }
    
    return response.data

}

let currentToken = null;

const getTokenFromClearVin = async() => {
    const email = process.env.CLEARVIN_EMAIL
    const password = process.env.CLEARVIN_PASSWORD

    let tokenResponse;
    // Generate token from ClearVin
    try{
        tokenResponse = await axios.post('https://www.clearvin.com/rest/vendor/login', {
            email: email,
            password: password
        });
    }catch(error){
        console.log(error)
    }

    const token = tokenResponse.data.token;
    currentToken = token;

    return currentToken;
}

// Function to generate token every 2 hours and update the currentToken variable

const initiateClearVINAccessToken = async () => {
    const token = await getTokenFromClearVin();
    console.log(token)
    currentToken = token;
    setInterval(async () => {
        const token = await getTokenFromClearVin();
        console.log(token)
        currentToken = token;
    }, 7200000); // 7200000 milliseconds = 2 hours
}
initiateClearVINAccessToken();


const getToken = async() => {
    return currentToken;
}

module.exports = {
    getCarPreview,
    getCarReportPDF,
    getCarReportHTML,
    getToken
}

