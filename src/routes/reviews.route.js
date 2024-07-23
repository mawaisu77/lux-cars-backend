const { Router } = require("express");
const { placeReview } = require("../controllers/reviews.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/reviews/place-review', isAuthenticatedUser,  placeReview);
                                        
module.exports =  router