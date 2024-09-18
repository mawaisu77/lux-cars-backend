const { Router } = require("express");
const {
  addPartsRequest,
  getUserPartsRequest,
  getPartsRequestDetail,
} = require("../controllers/partsRequest.controller.js");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { upload } = require("../middlewares/multer.js");
const router = Router();

router.post(
  "/add_partsRequest",
  isAuthenticatedUser,
  upload.array("partsImages", 6),
  addPartsRequest
);
router.get("/get_user_requests", isAuthenticatedUser, getUserPartsRequest);

router.get(
  "/get_user_parts_Requests_detail/:id",
  isAuthenticatedUser,
  getPartsRequestDetail
);

module.exports = router;
