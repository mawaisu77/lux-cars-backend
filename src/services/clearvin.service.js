const { axiosClearVin } = require('../utils/axiosPrivate')
const  ApiError  = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')


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
            responseType: 'arraybuffer'
        })

    }catch(error){
        throw new ApiError(404, "No data found against this Car!")
    }


    // // Set appropriate headers for PDF file
    // res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader('Content-Disposition', `attachment; filename="car_report_${vin}.pdf"`)

    // Send the PDF buffer data as the response
    console.log(response)
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



module.exports = {
    getCarPreview,
    getCarReportPDF,
    getCarReportHTML
}

