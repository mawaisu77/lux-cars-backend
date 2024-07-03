
const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const userService = require('../services/user.service.js');

const uploadDocuments = asyncHandler(async (req, res, next) => {
    const user = await userService.uploadDocuments(req);
    res.status(200).json(new ApiResponse(200, user, 'Documents uploaded successfully, awaiting verification.'));
});


const updateProfile = asyncHandler(async (req, res, next) => {
    const { userId } = req.user; 
    const updatedProfileData = req.body;
    const updatedUser = await userService.updateProfile(userId, updatedProfileData);
    res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully'));
  });

module.exports = {
    uploadDocuments,
    updateProfile
};