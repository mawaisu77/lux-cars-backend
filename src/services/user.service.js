const authRepository = require('../repositories/auth.repository.js');
const ApiError = require('../utils/ApiError');
const { uploadOnCloudinary } = require("../utils/cloudinary.js")
const { uploadDocs } = require('../utils/uplaodDocument.js')


const uplaodProfilePicture = async (req, res) => {
    var user = await authRepository.findUserById(req.user.id);


    if (user){

        var profilePicture = ""

        profilePicture = await uploadDocs(req)
        console.log(req.files)

        profilePicture = profilePicture[0]
        
        user.profilePicture = profilePicture
        await user.save()
        return user

    }else{

      throw new ApiError(404, 'User does not exist!');

    }

}


const uploadDocuments = async (req, res) => {

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, 'No document files provided');
  }

  
  const userId = req.user.id;
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const existingDocuments = user.documents || [];
  if (existingDocuments.length >= 2) {
    throw new ApiError(400, 'You can only upload a maximum of 2 documents');
  }

  const uploadResponses = [];
  for (const file of req.files) {
    const localFilePath = file.path;
    const uploadResponse = await uploadOnCloudinary(localFilePath);
    if (uploadResponse) {
      uploadResponses.push(uploadResponse.secure_url);
    }
  }


 // Concatenate new uploads to existing documents without exceeding the limit of 2
 const updatedDocuments = existingDocuments.concat(uploadResponses).slice(0, 2);
  
 user.documents = updatedDocuments; // Store URLs as JSON array
 user.documentVerificationStatus = 'pending';
 await user.save();
 
 return user
};

const editProfile = async (userId, updatedProfileData) => {

    try {

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
      if (updatedProfileData.address) {
        user.address = updatedProfileData.address;
      }
      if (updatedProfileData.phone) {
        user.phone = updatedProfileData.phone;
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
    getUserProfile,
    uplaodProfilePicture
}