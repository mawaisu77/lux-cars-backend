const { where } = require('sequelize');
const { Op } = require('sequelize');

const Reviews = require('../db/models/reviews');

const placeReview = async (reviewData) => {
    return await Reviews.create(reviewData);
};

const luxRatingData = async () => {
    return await Reviews.findAll()
}


module.exports = {
    placeReview,
    luxRatingData
};
