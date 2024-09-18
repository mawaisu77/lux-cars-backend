const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const clearvinService = require('../services/clearvin.service')

const getCarPreview = asyncHandler(async (req, res) => {
    const car = await clearvinService.getCarPreview(req)
    res.status(201).json(new ApiResponse(201, car, "Car preview fetched successfully."));
})

const getCarReportPDF = asyncHandler(async (req, res) => {
    const carReport = await clearvinService.getCarReportPDF(req, res)
    res.status(201).json(new ApiResponse(201, carReport, "Car report fetched successfully."));
})

const getCarReportHTML = asyncHandler(async (req, res) => {
    const carReport = await clearvinService.getCarReportHTML(req, res)
    res.status(201).json(new ApiResponse(201, carReport, "Car report fetched successfully."));
})

module.exports = {
    getCarPreview,
    getCarReportPDF,
    getCarReportHTML
}