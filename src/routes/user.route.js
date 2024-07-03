const { Router } = require("express");
const { uploadDocuments } = require("../controllers/user.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.put('/user/upload-documents',isAuthenticatedUser, upload.array('documents', 10), uploadDocuments);

module.exports =  router