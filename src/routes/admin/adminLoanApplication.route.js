const { Router } = require("express");
const {
  getAllLoanApplications,
  getLoanApplicationDetail,
  changeLoanApplicationStatus,
} = require("../../controllers/loanApplication.controller.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.get(
  "/get_all_loanapplications",
  isAuthenticatedAdmin,
  getAllLoanApplications
);

router.get(
  "/get_loanapplications_detail/:id",
  isAuthenticatedAdmin,
  getLoanApplicationDetail
);

router.post(
  "/change_loan_application_status",
  isAuthenticatedAdmin,
  changeLoanApplicationStatus
);

module.exports = router;
