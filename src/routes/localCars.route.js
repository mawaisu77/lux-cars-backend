const { Router } = require("express");
const { uploadCar } = require("../controllers/localCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.post('/localCars/uploadCar',  upload.fields([{
                                            name: 'carImages', maxCount: 12
                                        }]), uploadCar);


router.post('/localCars/saveCarDealer',  upload.fields([{
                                            name: 'dealershipLicense', maxCount: 1
                                        }]), uploadCar);

module.exports =  router