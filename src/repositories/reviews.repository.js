const { where } = require('sequelize');
const { Op } = require('sequelize');

const Reviews = require('../db/models/reviews');

const placeReview = async (reviewData) => {
    // saving the review data to the database
    return await Reviews.create(reviewData);
};

const luxRatingData = async () => {
    // getting the rating data from the database
    return await Reviews.findAll()
}


module.exports = {
    placeReview,
    luxRatingData
};
