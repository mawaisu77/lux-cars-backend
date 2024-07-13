
const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const userService = require('../services/user.service.js');

const uploadDocuments = asyncHandler(async (req, res, next) => {
  
    const user = await userService.uploadDocuments(req);
    res.status(200).json(new ApiResponse(200, user, 'Documents uploaded successfully, awaiting verification.'));
});


const getUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await userService.getUserProfile(userId);
    console.log("+_+_+_+_+", user.documents[0])
    res.status(200).json(new ApiResponse(200, user, 'User profile fetched successfully'));
  });

const editProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id; 
    const updatedProfileData = req.body;
    const updatedUser = await userService.editProfile(userId, updatedProfileData);
    console.log(updatedUser)
    res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully'));
  });

module.exports = {
    uploadDocuments,
    editProfile,
    getUserProfile
};