const { Router } = require("express");
const { uploadCar, updateCar, getCarByID, getUserAllLocalCars, getAllUnApprovedLocalCars, getAllApprovedLocalCars } = require("../controllers/localCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.post('/local-cars/upload-car', isAuthenticatedUser, upload.array('carImages', 6),  uploadCar);
router.put('/local-cars/update-car', isAuthenticatedUser, upload.array('carImages', 12), updateCar)
router.get('/local-cars/get-car', isAuthenticatedUser, getCarByID)
router.get('/local-cars/get-all-cars', isAuthenticatedUser, getUserAllLocalCars)
router.get('/local-cars/get-all-unapproved-local-cars', getAllUnApprovedLocalCars)
router.get('/local-cars/get-all-approved-local-cars', getAllApprovedLocalCars)


module.exports =  router