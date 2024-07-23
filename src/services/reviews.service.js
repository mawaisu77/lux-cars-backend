const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const reviewsRepository = require('../repositories/reviews.repository.js');
const { uploadDocuments } = require('../utils/uplaodDocument.js')
const ApiError = require('../utils/ApiError.js');


const placeReview = async (req, res) => {
    try {

        // Getting userID
        const userID = req.user.id
        console.log(req.body)

        // Preparing CarData 
        const reviewData = {...req.body, userID}

        // Sending Car to database
        const review = await reviewsRepository.placeReview(reviewData)
        return review

    } catch (err) {
        throw new ApiError(404, err)
    }
}

const luxRatingData = async (req, res) => {
    try{
        const ratingData = await reviewsRepository.ratingData()

    }catch(err){
        throw ApiError(404, err)
    }
}




module.exports = {
    placeReview,
    luxRatingData
}