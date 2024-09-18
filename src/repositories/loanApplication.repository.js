const Loan_Application = require("../db/models/loanapplications");

const createApplication = async (applicationPayload) => {
  return await Loan_Application.create(applicationPayload);
};

const findAllLoanApplicationsOfUser = async (userId) => {
  return await Loan_Application.findAll({
    where: {
      userID: userId,
    },
  });
};

const findAllLoanApplications = async () => {
  return await Loan_Application.findAll();
};

const findLoanApplicationDetailOfUser = async (id) => {
  return await Loan_Application.findOne({
    where: {
      id: id,
    },
  });
};
module.exports = {
  createApplication,
  findAllLoanApplicationsOfUser,
  findAllLoanApplications,
  findLoanApplicationDetailOfUser,
};
