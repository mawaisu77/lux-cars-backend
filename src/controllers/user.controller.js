const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const userService = require("../services/user.service.js");
const uplaodDocument = require("../utils/uplaodDocument.js");

const uplaodProfilePicture = asyncHandler(async (req, res) => {
  const user = await userService.uplaodProfilePicture(req);
  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile picture uploaded successfully!"));
});

const uploadDocuments = asyncHandler(async (req, res, next) => {
  const user = await userService.uploadDocuments(req);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Documents uploaded successfully, awaiting verification."
      )
    );
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await userService.getUserProfile(userId);
  res
    .status(200)
    .json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const editProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const updatedProfileData = req.body;
  const updatedUser = await userService.editProfile(userId, updatedProfileData);
  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});


const getPendingDocumentsByAdmin = asyncHandler(async (req, res, next) => {
  const documents = await userService.getPendingDocumentsByAdmin();
  res
    .status(200)
    .json(new ApiResponse(200, documents, "Documents fetched successfully"));
});

const changeDocumentStatusByAdmin = asyncHandler(async (req, res, next) => {
  const { documentVerificationStatus, userId, reasonOfRejection } = req.body;
  const updatedUser = await userService.changeDocumentStatusByAdmin(
    userId,
    documentVerificationStatus,
    reasonOfRejection
  );
  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Document Status updated successfully")
    );
});

const getAllUsersByAdmin = asyncHandler(async (req, res, next) => {
  const users = await userService.getAllUsersByAdmin();

  const data = users.map((user) => ({
    id: user.dataValues.id,
    username: user.dataValues.username,
    email: user.dataValues.email,
    address: user.dataValues.address,
    phone: user.dataValues.phone,
    documents: user.dataValues.documents,
    isEmailVerified: user.dataValues.isEmailVerified,
    profilePicture: user.dataValues.profilePicture,
    documentVerified: user.dataValues.documentVerified,
    documentVerificationStatus: user.dataValues.documentVerificationStatus,
  }));

  res
    .status(200)
    .json(new ApiResponse(200, data, "Users fetched successfully"));
});

const getUserDetailByAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userService.getUserProfile(userId);
  const data = {
    username: user.username,
    email: user.email,
    address: user.address,
    phone: user.phone,
    documents: user.documents,
    isEmailVerified: user.isEmailVerified,
    profilePicture: user.profilePicture,
    documentVerified: user.documentVerified,
    documentVerificationStatus: user.documentVerificationStatus,
  };
  res
    .status(200)
    .json(new ApiResponse(200, data, "User profile fetched successfully"));
});

const getAllAdmins = asyncHandler(async (req, res, next) => {
  const admins = await userService.getAllAdmins();

  const data = admins.map((admin) => ({
    id: admin.dataValues.id,
    username: admin.dataValues.username,
    email: admin.dataValues.email,
    role: admin.dataValues.role,
  }));

  res
    .status(200)
    .json(new ApiResponse(200, data, "Admins fetched successfully"));
});

module.exports = {
  uploadDocuments,
  editProfile,
  getUserProfile,
  uplaodProfilePicture,
  getPendingDocumentsByAdmin,
  changeDocumentStatusByAdmin,
  getAllUsersByAdmin,
  getUserDetailByAdmin,
  getAllAdmins,
};
