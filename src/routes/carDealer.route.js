const { Router } = require("express");
const { registerCarDealer } = require("../controllers/carDealers.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()


router.post('/car-dealer/register-car-dealer',isAuthenticatedUser,  upload.array('dealershipLicense', 2), registerCarDealer);

module.exports =  router