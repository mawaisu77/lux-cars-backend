const { Router } = require("express");
const { saveCar, deleteCar, getUsersSavedCars, getUsersSavedCarsIDs } = require("../controllers/savedCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/saved-cars/save-car', isAuthenticatedUser,  saveCar);
router.delete('/saved-cars/delete-car', isAuthenticatedUser, deleteCar);
router.get('/saved-cars/get-users-saved-cars', isAuthenticatedUser, getUsersSavedCars);
router.get('/saved-cars/get-user-saved-cars-ids', isAuthenticatedUser, getUsersSavedCarsIDs)

module.exports =  router