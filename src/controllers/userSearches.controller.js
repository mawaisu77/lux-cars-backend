const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const userSearchService = require('../services/userSearches.service')

const addUserSearch = asyncHandler(async (req, res) => {
    const userSearch = await userSearchService.addUserSearch(req, res)
    res.status(200).json(new ApiResponse(200, userSearch, "User Search Added Successfully!"));
})

module.exports = {
    addUserSearch
}