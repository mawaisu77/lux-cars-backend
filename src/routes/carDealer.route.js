const { Router } = require("express");
const { registerCarDealer, updateCarDealer, getDealerByUserID} = require("../controllers/carDealers.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()


router.post('/car-dealer/register-car-dealer', isAuthenticatedUser,  upload.array('dealershipLicense', 2), registerCarDealer);
router.put('/car-dealer/update-car-dealer', isAuthenticatedUser, upload.array('dealershipLicense', 2), updateCarDealer)
router.get('/car-dealer/get-car-dealer', isAuthenticatedUser, getDealerByUserID)

module.exports =  router