const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const partsRequestService = require("../services/partsRequest.service");

const addPartsRequest = asyncHandler(async (req, res) => {
  const partsRequest = await partsRequestService.addPartsRequest(req);
  res
    .status(201)
    .json(
      new ApiResponse(201, partsRequest, "Parts Request Added successfully.")
    );
});

const getUserPartsRequest = asyncHandler(async (req, res) => {
  const userID = req.user.id;
  const partsRequests = await partsRequestService.getUserPartsRequest(userID);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        partsRequests,
        "Parts Requests Of User fetched successfully"
      )
    );
});

const getAllPartsRequests = asyncHandler(async (req, res) => {
  const partsRequests = await partsRequestService.getAllPartsRequests();
  res
    .status(200)
    .json(
      new ApiResponse(200, partsRequests, "Parts Requests fetched successfully")
    );
});

const getPartsRequestDetail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const partsRequest = await partsRequestService.getPartsRequestDetail(id);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        partsRequest,
        "Parts Request Detail fetched successfully"
      )
    );
});

const changePartsRequestStatus = asyncHandler(async (req, res, next) => {
  const { id, status, reasonOfRejection } = req.body;
  const requestUpdatedStatus =
    await partsRequestService.changePartsRequestStatus(
      id,
      status,
      reasonOfRejection
    );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        requestUpdatedStatus,
        "Request Status updated successfully"
      )
    );
});

module.exports = {
  addPartsRequest,
  getUserPartsRequest,
  getAllPartsRequests,
  getPartsRequestDetail,
  changePartsRequestStatus,
};
