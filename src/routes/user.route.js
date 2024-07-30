const { Router } = require("express");
const { uploadDocuments, editProfile, getUserProfile, uplaodProfilePicture } = require("../controllers/user.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router()

router.post('/user/upload-documents',isAuthenticatedUser, upload.array('documents', 2), uploadDocuments);
router.get('/user/profile', isAuthenticatedUser, getUserProfile);
router.put('/user/edit-profile', isAuthenticatedUser, editProfile);
router.put('/user/upload-profile-picture', isAuthenticatedUser, upload.array('profilePicture', 1), uplaodProfilePicture)

module.exports =  router