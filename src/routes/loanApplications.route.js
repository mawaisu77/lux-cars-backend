const { Router } = require("express");
const {
  addLoanApplication,
  getUserLoanApplications,
  getLoanApplicationDetail,
} = require("../controllers/loanApplication.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router();

router.post("/add_loanapplication", isAuthenticatedUser, addLoanApplication);

router.get(
  "/get_user_loanapplications",
  isAuthenticatedUser,
  getUserLoanApplications
);

router.get(
  "/get_user_loanapplication_detail/:id",
  isAuthenticatedUser,
  getLoanApplicationDetail
);

module.exports = router;
