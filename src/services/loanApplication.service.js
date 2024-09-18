const loanApplicationRepository = require("../repositories/loanApplication.repository");
const authRepository = require("../repositories/auth.repository");
const ApiError = require("../utils/ApiError");
const sendEmail = require("../utils/sendMail");
const userService = require('../services/user.service')

const addLoanApplication = async (req) => {
  const userID = req.user.id;

  const {
    title,
    firstName,
    lastName,
    email,
    address,
    city,
    yearAtAddress,
    monthsAtAddress,
    cellPhoneNumber,
    workPhoneNumber,
    monthlyPayment,
    residentType,
    vehicleInfo,
    employerName,
    employerPhone,
    occupation,
    yearsAtEmployer,
    monthlyIncome,
    bankName,
    accountType,
    financingAmount,
    downPayment,
    isTrade,
    isCoApplicant,
    bankForContact,
    timeforContact,
  } = req.body;

  const applicationStatus = "pending";
  const applicationPayload = {
    userID,
    title,
    firstName,
    lastName,
    email,
    address,
    city,
    yearAtAddress,
    monthsAtAddress,
    cellPhoneNumber,
    workPhoneNumber,
    monthlyPayment,
    residentType,
    vehicleInfo,
    employerName,
    employerPhone,
    occupation,
    yearsAtEmployer,
    monthlyIncome,
    bankName,
    accountType,
    financingAmount,
    downPayment,
    isTrade,
    isCoApplicant,
    bankForContact:JSON.stringify(bankForContact),
    timeforContact,
    applicationStatus,
  };

  const loanApplication = await loanApplicationRepository.createApplication(
    applicationPayload
  );
  return loanApplication;
};

const getUserLoanApplications = async (userId) => {
  const loanApplication =
    await loanApplicationRepository.findAllLoanApplicationsOfUser(userId);
  if (!loanApplication || loanApplication.length < 1) {
    throw new ApiError(404, "No Applications Requests found");
  }
  return loanApplication;
};

const getAllLoanApplications = async () => {
  const loanApplication =
    await loanApplicationRepository.findAllLoanApplications();
  const applications = await Promise.all(
    loanApplication.map(async (data) => {
      const userID = data.userID;
      const user = await userService.getUserProfile(userID);
      return {
        user: { username: user.username, email: user.email, phone: user.phone },
        applicationData: data,
      };
    })
  );
  if (!applications || applications.length < 1) {
    throw new ApiError(404, "No Applications Requests found");
  }
  return applications;
};

const getLoanApplicationDetail = async (id) => {
  const loanApplication =
    await loanApplicationRepository.findLoanApplicationDetailOfUser(id);
  if (!loanApplication) {
    throw new ApiError(404, "No Application found");
  }
  return loanApplication;
};

const changeLoanApplicationStatus = async (
  id,
  applicationStatus,
  reasonOfRejection
) => {
  const reasonOfRejection2 = reasonOfRejection;

  const loanApplication =
    await loanApplicationRepository.findLoanApplicationDetailOfUser(id);

  const userName = loanApplication.firstName;

  if (applicationStatus === "approved") {
    const message = `Hello ${userName},\n\nCongratulations, Your Loan is Approved.`;

    loanApplication.applicationStatus = applicationStatus;
    const newStatus = await loanApplication.save();

    await sendEmail(
      {
        email: loanApplication.email,
        subject: "LUX CARS Loan Application Status",
        message,
      },
      "text"
    );
    if (!newStatus) {
      throw new ApiError(404, "Application Status not Updated Successfully");
    } else {
      return newStatus;
    }
  }

  if (applicationStatus === "rejected") {
    const message = `Hello ${userName},\n\nYour Loan Application is rejected Due to following reasons\n\n${reasonOfRejection2}\n\n\nKindly upload your documents again.`;

    loanApplication.applicationStatus = applicationStatus;
    const newStatus = await loanApplication.save();

    await sendEmail(
      {
        email: loanApplication.email,
        subject: "LUX CARS Loan Application Status",
        message,
      },
      "text"
    );
    if (!newStatus) {
      throw new ApiError(404, "Application Status not Updated Successfully");
    } else {
      return newStatus;
    }
  }
};

module.exports = {
  addLoanApplication,
  getUserLoanApplications,
  getAllLoanApplications,
  getLoanApplicationDetail,
  changeLoanApplicationStatus,
};
