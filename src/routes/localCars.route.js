const { Router } = require("express");
const { 

    uploadCar, 
    updateCar, 
    getCarByID, 
    getUserAllLocalCars, 
    getAllUnApprovedLocalCars, 
    getAllLocalCars,  
    getFutureAuctionCars,
    getCurrentWeekAuctionCars,
    

} = require("../controllers/localCars.controller.js");

const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.post('/local-cars/upload-car', isAuthenticatedUser, upload.fields([
    { name: 'carImages', maxCount: 6 },
    { name: 'carDocuments', maxCount: 6 }
]), uploadCar);
router.put('/local-cars/update-car', upload.array('carImages', 12), updateCar)
router.get('/local-cars/get-car', getCarByID)
router.get('/local-cars/get-user-all-local-cars',isAuthenticatedUser, getUserAllLocalCars)
router.get('/local-cars/get-all-unapproved-local-cars', getAllUnApprovedLocalCars)
router.get('/local-cars/get-all-local-cars', getAllLocalCars)
router.get('/local-cars/get-future-auction-local-cars', getFutureAuctionCars)
router.get('/local-cars/get-current-week-cars', getCurrentWeekAuctionCars)





module.exports =  router
 