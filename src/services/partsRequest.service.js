const ApiError = require("../utils/ApiError");
const partsRequestRepository = require("../repositories/partsRequest.repository");
const userService = require("../services/user.service.js");
const sendEmail = require("../utils/sendMail");
const authRepository = require("../repositories/auth.repository.js");
const { uploadDocs } = require("../utils/uplaodDocument.js");

const addPartsRequest = async (req) => {
  const { company, yearMade, model, variant, location, partsDetails } =
    req.body;
  const partsImages = req.files ? await uploadDocs(req) : null;

  const userID = req.user ? req.user.id : null;
  const status = "pending";

  if (!userID) {
    throw new Error("User ID is required but was not found.");
  }

  const partsRequestPayload = {
    company,
    yearMade,
    model,
    variant,
    location,
    partsDetails,
    partsImages,
    status,
    userID,
  };

  const partsRequest = await partsRequestRepository.createRequest(
    partsRequestPayload
  );
  return partsRequest;
};

const getUserPartsRequest = async (userId) => {
  const partsRequests = await partsRequestRepository.findAllPartsRequestsByUser(
    userId
  );
  if (!partsRequests || partsRequests.length < 1) {
    throw new ApiError(404, "No Parts Requests found");
  }
  return partsRequests;
};

const getAllPartsRequests = async () => {
  const partsRequests = await partsRequestRepository.findAllPartsRequests();
  const requests = await Promise.all(
    partsRequests.map(async (data) => {
      const userID = data.userID;
      const user = await userService.getUserProfile(userID);
      return {
        user: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        requestData: data,
      };
    })
  );
  if (!requests || requests.length < 1) {
    throw new ApiError(404, "No Requests found");
  }
  return requests;
};

const getPartsRequestDetail = async (id) => {
  const partsRequest =
    await partsRequestRepository.findPartsRequestDetailOfUser(id);
  if (!partsRequest) {
    throw new ApiError(404, "No Request found");
  }
  return partsRequest;
};

const changePartsRequestStatus = async (id, status, reasonOfRejection) => {
  const reasonOfRejection2 = reasonOfRejection;

  const partsRequest =
    await partsRequestRepository.findPartsRequestDetailOfUser(id);

  const userID = partsRequest.userID;
  const user = await authRepository.findUserById(userID);
  const userName = user.username;

  if (status === "approved") {
    const message = `Hello ${userName},\n\nCongratulations, Your Parts is Approved.`;

    partsRequest.status = status;
    const newStatus = await partsRequest.save();

    await sendEmail(
      {
        email: user.email,
        subject: "LUX CARS Parts Request Status",
        message,
      },
      "text"
    );
    if (!newStatus) {
      throw new ApiError(404, "Request Status not Updated Successfully");
    } else {
      return newStatus;
    }
  }

  if (status === "rejected") {
    const message = `Hello ${userName},\n\nYour Parts Request is rejected Due to following reasons\n\n${reasonOfRejection2}\n\n\nKindly make a new reuqest.`;

    partsRequest.status = status;
    const newStatus = await partsRequest.save();

    await sendEmail(
      {
        email: user.email,
        subject: "LUX CARS Parts Request Status",
        message,
      },
      "text"
    );
    if (!newStatus) {
      throw new ApiError(404, "Request Status not Updated Successfully");
    } else {
      return newStatus;
    }
  }
};

module.exports = {
  addPartsRequest,
  getUserPartsRequest,
  getAllPartsRequests,
  getPartsRequestDetail,
  changePartsRequestStatus,
};
