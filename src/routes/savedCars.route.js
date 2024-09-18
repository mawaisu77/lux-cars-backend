const { Router } = require("express");
const { saveCar, deleteCar, getUsersSavedCars } = require("../controllers/savedCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/saved-cars/save-car', isAuthenticatedUser,  saveCar);
router.delete('/saved-cars/delete-car', isAuthenticatedUser, deleteCar);
router.get('/saved-cars/get-users-saved-cars', isAuthenticatedUser, getUsersSavedCars);

module.exports =  router