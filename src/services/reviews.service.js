const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const reviewsRepository = require('../repositories/reviews.repository.js');
const { uploadDocuments } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const placeReview = async (req, res) => {
    // Getting userID
    const userID = req.user.id
    console.log(req.body)

    // Preparing CarData 
    const reviewData = {...req.body, userID}

    // Sending Car to database
    const review = await reviewsRepository.placeReview(reviewData)
    return review
}

const luxRatingData = async (req, res) => {
    // getting the rating data from the database
    const ratingData = await reviewsRepository.luxRatingData()
    console.log(ratingData)
    if(ratingData){
        const ratingsCount = ratingData.reduce((acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
        }, {});

        const totalReviews = ratingData.length;
        const averageRating = ratingData.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

        return {
            ratingsCount,
            averageRating,
            totalReviews
        };

    }

    // throwing an error if no rating data is found
    throw new ApiError(404, "No rating data found!")
}




module.exports = {
    placeReview,
    luxRatingData
}