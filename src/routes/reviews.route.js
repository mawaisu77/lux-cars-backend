const { Router } = require("express");
const { placeReview, luxRatingData } = require("../controllers/reviews.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/reviews/place-review', isAuthenticatedUser,  placeReview);
router.get('/review/lux-rating-data', luxRatingData)
                                        
module.exports =  router