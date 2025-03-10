const { Router } = require("express");
const { addFunds, getUserFunds, refundUserFunds } = require("../controllers/funds.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()

router.post('/funds/add-funds', isAuthenticatedUser, addFunds)
router.get('/funds/get-funds', isAuthenticatedUser, getUserFunds)
router.put('/funds/refund-funds', isAuthenticatedUser, refundUserFunds)

module.exports = router
