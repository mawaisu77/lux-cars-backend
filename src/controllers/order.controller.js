const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const orderService = require("../services/order.service");

const generateOrderByAdmin = asyncHandler(async (req, res) => {
  const bidId = req.body.bidID;
  const order = await orderService.generateOrderByAdmin(bidId);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        order,
        "Order Generated and Email Send successfully!"
      )
    );
});

const getAllOrdersByAdmin = asyncHandler(async (req, res) => {
  const order = await orderService.getAllOrdersByAdmin();
  res
    .status(200)
    .json(new ApiResponse(200, order, "Order Data Fetched successfully!"));
});

const changeOrderStatus = asyncHandler(async (req, res) => {
  const { id, status, reasonOfRejection } = req.body;
  const updatedOrderStatus = await orderService.changeOrderStatus(
    id,
    status,
    reasonOfRejection
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedOrderStatus,
        "Order Status Updated successfully!"
      )
    );
});

module.exports = {
  generateOrderByAdmin,
  getAllOrdersByAdmin,
  changeOrderStatus,
};
