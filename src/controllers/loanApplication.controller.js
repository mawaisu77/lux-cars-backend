const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const loanApplicationService = require("../services/loanApplication.service");

const addLoanApplication = asyncHandler(async (req, res) => {
  const loanApplication = await loanApplicationService.addLoanApplication(req);
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        loanApplication,
        "Loan Application Added successfully."
      )
    );
});

const getUserLoanApplications = asyncHandler(async (req, res) => {
  const userID = req.user.id;
  const loanApplication = await loanApplicationService.getUserLoanApplications(
    userID
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        loanApplication,
        "Loan Applications Of User fetched successfully"
      )
    );
});

const getAllLoanApplications = asyncHandler(async (req, res) => {
  const loanApplications =
    await loanApplicationService.getAllLoanApplications();
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        loanApplications,
        "Loan Applications fetched successfully"
      )
    );
});

const getLoanApplicationDetail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const loanApplication = await loanApplicationService.getLoanApplicationDetail(
    id
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        loanApplication,
        "Loan Application Detail fetched successfully"
      )
    );
});

const changeLoanApplicationStatus = asyncHandler(async (req, res, next) => {
  const { id, applicationStatus, reasonOfRejection } = req.body;
  const applicationUpdatedStatus =
    await loanApplicationService.changeLoanApplicationStatus(
      id,
      applicationStatus,
      reasonOfRejection
    );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        applicationUpdatedStatus,
        "Application Status updated successfully"
      )
    );
});

module.exports = {
  addLoanApplication,
  getUserLoanApplications,
  getAllLoanApplications,
  getLoanApplicationDetail,
  changeLoanApplicationStatus,
};
