const { Router } = require("express");
const {
  getAllPartsRequests,
  getPartsRequestDetail,
  changePartsRequestStatus,
} = require("../../controllers/partsRequest.controller.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.get(
  "/get_all_partsRequests",
  isAuthenticatedAdmin,
  getAllPartsRequests
);

router.get(
  "/get_partsRequests_detail/:id",
  isAuthenticatedAdmin,
  getPartsRequestDetail
);

router.post(
  " ",
  isAuthenticatedAdmin,
  changePartsRequestStatus
);

module.exports = router;
