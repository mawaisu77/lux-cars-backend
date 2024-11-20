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

router.put("/change-order-status", changeOrderStatus);

router.get("/get-order-details", isAuthenticatedAdmin, getOrderByID)

module.exports = router;
