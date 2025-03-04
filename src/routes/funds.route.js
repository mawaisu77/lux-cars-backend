const { Router } = require("express");
const { addFunds, getUserFunds } = require("../controllers/funds.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/funds/add-funds', isAuthenticatedUser, addFunds)
router.get('/funds/get-funds', isAuthenticatedUser, getUserFunds)


module.exports = router
