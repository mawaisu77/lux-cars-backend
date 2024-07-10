const authRepository = require('../repositories/auth.repository.js');
const ApiError = require('../utils/ApiError');
const { uploadOnCloudinary } = require("../utils/cloudinary.js")

const uploadDocuments = async (req, res) => {

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, 'No document files provided');
  }
  console.log("+++", req.files)

  const uploadResponses = [];
  for (const file of req.files) {
    const localFilePath = file.path;
    const uploadResponse = await uploadOnCloudinary(localFilePath);
    if (uploadResponse) {
      uploadResponses.push(uploadResponse.secure_url);
    }
  }

  const user = await authRepository.findUserById(req.user.id)
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.documents = JSON.stringify(uploadResponses); // Store URLs as JSON array string
  user.documentVerificationStatus = 'pending';
  await user.save();
  return user;

};

const editProfile = async (userId, updatedProfileData) => {

    try {

      console.log("update profile", updatedProfileData)
      const user = await authRepository.findUserById(userId);

      if (!user) {
        throw new ApiError(404, 'User not found');
      }
  
      if (updatedProfileData.username) {
        user.username = updatedProfileData.username;
      }
      if (updatedProfileData.email) {
        user.email = updatedProfileData.email;
      }
      if (updatedProfileData.fullName) {
        user.fullName = updatedProfileData.fullName;
      }
      if (updatedProfileData.phoneNumber) {
        user.phoneNumber = updatedProfileData.phoneNumber;
      }
  
      await user.save();
      return user;
    } catch (error) {
      throw new ApiError(400, 'Error updating profile', error);
    }
};
  
const getUserProfile = async (userId) => {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

  module.exports = {
    uploadDocuments,
    editProfile,
    getUserProfile
}