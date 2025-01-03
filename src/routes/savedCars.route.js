const { Router } = require("express");
const { 
    saveCar,
    saveLocalCar, 
    deleteCar, 
    deleteLocalCar, 
    getUsersSavedCars, 
    getUsersSavedCarsIDs, 
    getUsersSavedLocalCarsIDs, 
    getUsersSavedLocalCars
} = require("../controllers/savedCars.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/saved-cars/save-car', isAuthenticatedUser,  saveCar);
router.post('/saved-cars/save-local-car', isAuthenticatedUser,  saveLocalCar);
router.put('/saved-cars/delete-car', isAuthenticatedUser, deleteCar);
router.put('/saved-cars/delete-local-car', isAuthenticatedUser, deleteLocalCar);
router.get('/saved-cars/get-users-saved-cars', isAuthenticatedUser, getUsersSavedCars);
router.get('/saved-cars/get-user-saved-cars-ids', isAuthenticatedUser, getUsersSavedCarsIDs)
router.get('/saved-cars/get-user-saved-local-cars-ids', isAuthenticatedUser, getUsersSavedLocalCarsIDs)
router.get('/saved-cars/get-user-saved-local-cars', isAuthenticatedUser, getUsersSavedLocalCars)


module.exports =  router