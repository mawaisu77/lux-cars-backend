const { Router } = require("express");
const {
  changeCarStatus,
} = require("../../controllers/localCars.controller.js");
const { isAuthenticatedAdmin } = require("../../middlewares/auth.js");
const router = Router();

router.post("/change-local-car-status", isAuthenticatedAdmin, changeCarStatus);

module.exports = router;
