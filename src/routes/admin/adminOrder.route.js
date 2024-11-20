const { Router } = require("express");
const {
  generateOrderByAdmin,
  getAllOrdersByAdmin,
  changeOrderStatus,
  getOrderByID
} = require("../../controllers/order.controller");
const { isAuthenticatedAdmin } = require("../../middlewares/auth");
const router = Router();

router.post("/generateOrder", generateOrderByAdmin);

router.get("/getAllOrders", isAuthenticatedAdmin, getAllOrdersByAdmin);

router.post("/changeOrderStatus", isAuthenticatedAdmin, changeOrderStatus);

router.get("/get-order-details", getOrderByID)

module.exports = router;
