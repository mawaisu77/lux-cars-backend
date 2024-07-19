const { Router } = require("express");
const { uploadCar } = require("../controllers/localCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.post('/local-cars/upload-car', upload.array('carImages', 12),  uploadCar);
                                        
module.exports =  router