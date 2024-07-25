const { Router } = require("express");
const { uploadCar, updateCar, getCarByID, getAllLocalCars } = require("../controllers/localCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.post('/local-cars/upload-car', isAuthenticatedUser, upload.array('carImages', 6),  uploadCar);
router.put('/local-cars/update-car', isAuthenticatedUser, upload.array('carImages', 12), updateCar)
router.get('/local-cars/get-car', isAuthenticatedUser, getCarByID)
router.get('/local-cars/get-all-cars', isAuthenticatedUser, getAllLocalCars)        

module.exports =  router