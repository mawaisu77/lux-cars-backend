const { Router } = require("express");
const {
  generateOrderByAdmin,
  getAllOrdersByAdmin,
  changeOrderStatus
} = require("../../controllers/order.controller");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.post("/generateOrder", isAuthenticatedAdmin, generateOrderByAdmin);

router.get("/getAllOrders", isAuthenticatedAdmin, getAllOrdersByAdmin);

router.post("/changeOrderStatus", isAuthenticatedAdmin, changeOrderStatus);

module.exports = router;
