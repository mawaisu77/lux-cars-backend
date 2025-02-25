const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { addUserSearch } = require('../controllers/userSearches.controller')
const { Router } = require("express");
const router = Router()

router.post("/user-searches/add-user-search", isAuthenticatedUser, addUserSearch)

module.exports =  router