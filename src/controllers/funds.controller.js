const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const fundsService = require('../services/funds.service');

const addFunds = asyncHandler(async (req, res) => {
    const funds = await fundsService.addFunds(req)
    res.status(201).json(new ApiResponse(201, funds, "Funds has been added successfully.", ));
})

module.exports = {
    addFunds
}
