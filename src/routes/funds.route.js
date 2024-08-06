const { Router } = require("express");
const { addFunds } = require("../controllers/funds.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/funds/add-funds', isAuthenticatedUser, addFunds)


module.exports = router
