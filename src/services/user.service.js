const authRepository = require('../repositories/auth.repository.js');
const ApiError = require('../utils/ApiError');
const {uploadOnCloudinary} = require("../utils/cloudinary.js")

const uploadDocuments = async (req, res) => {
    console.log("req.user")

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, 'No document files provided');
      }
      console.log("+++",req.files)

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

  module.exports = {
    uploadDocuments
}