const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const reviews = require('../services/reviews.service.js')

const placeReview = asyncHandler(async (req, res) => {
    const review = await reviews.placeReview(req)
    res.status(201).json(new ApiResponse(201, review, "Review Placed successfully.", ));

})


const luxRatingData = asyncHandler(async (req, res) => {
    const ratingData = await reviews.luxRatingData()
    res.status(201).json(new ApiResponse(201, ratingData, "Review Placed successfully.", ));

})

module.exports = {
    placeReview,
    luxRatingData
}