const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const ApiError = require("./ApiError.js");

const uploadDocs = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "No document files provided");
  }

  const uploadResponses = [];
  for (const file of req.files) {
    const localFilePath = file.path;
    const uploadResponse = await uploadOnCloudinary(localFilePath);

    if (uploadResponse) {
      uploadResponses.push(uploadResponse.secure_url);
    }
  }

  return uploadResponses;
};

const uploadSingleDoc = async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No document file provided");
  }
  const localFile = req.file;
  const localFilePath = localFile.path;

  console.log("LOCALFILEPATH>>", localFilePath);
  const uploadResponse = await uploadOnCloudinary(localFilePath);

  return uploadResponse.secure_url;
};

module.exports = {
  uploadDocs,
  uploadSingleDoc,
};
