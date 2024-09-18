const authRepository = require("../repositories/auth.repository.js");
const ApiError = require("../utils/ApiError");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const { uploadDocs } = require("../utils/uplaodDocument.js");
const sendEmail = require("../utils/sendMail");

const uplaodProfilePicture = async (req, res) => {
    // getting the user from the database
    var user = await authRepository.findUserById(req.user.id);

    if (user){

        var profilePicture = ""

        profilePicture = await uploadDocs(req)
        //console.log(req.files)

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
    throw new ApiError(400, "No document files provided");
  }

  if (req.files.length === 1) {
    throw new ApiError(400, "Please uplaod both documents");
  }

  const userId = req.user.id;
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const existingDocuments = user.documents || [];

  if (existingDocuments.length >= 2) {
    throw new ApiError(400, "You can only upload a maximum of 2 documents");
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
  const updatedDocuments = existingDocuments
    .concat(uploadResponses)
    .slice(0, 2);

  user.documents = updatedDocuments; // Store URLs as JSON array
  user.documentVerificationStatus = "pending";
  await user.save();

  return user;
};

const editProfile = async (userId, updatedProfileData) => {
  try {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
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
    throw new ApiError(400, "Error updating profile");
  }
};

const getUserProfile = async (userId) => {
  const user = await authRepository.findUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

const getPendingDocumentsByAdmin = async () => {
  const documents = await authRepository.findByDocumentStatus();
  if (!documents) {
    throw new ApiError(404, "Documents not found");
  }
  return documents;
};

const changeDocumentStatusByAdmin = async (
  userId,
  documentVerificationStatus,
  reasonOfRejection
) => {
  const reasonOfRejection2 = reasonOfRejection;

  if (documentVerificationStatus === "approved") {
    const user = await authRepository.findUserById(userId);

    const userName = user.username;
    const message = `Hello ${userName},\n\nCongratulations, Your Document is Verified Successfully.`;

    user.documentVerificationStatus = documentVerificationStatus;
    user.documentVerified = true;
    const newStatus = await user.save();

    await sendEmail(
      {
        email: user.email,
        subject: "LUX CARS Document Verification Status",
        message,
      },
      "text"
    );
    if (!newStatus) {
      throw new ApiError(404, "Documents not Updated Successfully");
    } else {
      return newStatus;
    }
  }

  if (documentVerificationStatus === "rejected") {
    const user = await authRepository.findUserById(userId);

    const userName = user.username;
    const message = `Hello ${userName},\n\nYour Document Verification is rejected Due to following reasons\n\n${reasonOfRejection2}\n\n\nKindly upload your documents again.`;

    user.documentVerificationStatus = documentVerificationStatus;
    user.documentVerified = false;
    user.documents = [null];
    const newStatus = await user.save();

    await sendEmail(
      {
        email: user.email,
        subject: "LUX CARS Document Verification Status",
        message,
      },
      "text"
    );
    if (!newStatus) {
      throw new ApiError(404, "Documents not Updated Successfully");
    } else {
      return newStatus;
    }
  }
};

const getAllUsersByAdmin = async () => {
  const users = await authRepository.findAllUsers();
  if (!users) {
    throw new ApiError(404, "Users not found");
  }
  return users;
};

const getAllAdmins = async () => {
  const admins = await authRepository.findAllAdmins();
  if (!admins) {
    throw new ApiError(404, "Admins not found");
  }
  return admins;
};

module.exports = {
  uploadDocuments,
  editProfile,
  getUserProfile,
  uplaodProfilePicture,
  getPendingDocumentsByAdmin,
  changeDocumentStatusByAdmin,
  getAllUsersByAdmin,
  getAllAdmins,
};
