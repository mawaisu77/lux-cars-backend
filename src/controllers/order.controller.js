const asyncHandler = require("express-async-handler");
const { ApiResponse } = require("../utils/ApiResponse");
const orderService = require("../services/order.service");

const generateOrderByAdmin = asyncHandler(async (req, res) => {
  const { bidID }  = req.query;
  const order = await orderService.generateOrderByAdmin(bidID);
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
  const { orderID } = req.query
  const { status } = req.body;
  const updatedOrderStatus = await orderService.changeOrderStatus(
    orderID,
    status,
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

const getOrderByID = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderByID(req)
  res.status(200).json(new ApiResponse(200, order, "Order fetched successfully!"));
})

const getAllOrdersOfUser = asyncHandler(async (req, res) => {
  const userID = req.user.id
  const userOrders = await orderService.getAllOrdersOfUser(userID)
  res.status(200).json(new ApiResponse(200, userOrders, "Order fetched successfully!"));
})

module.exports = {
  generateOrderByAdmin,
  getAllOrdersByAdmin,
  changeOrderStatus,
  getOrderByID,
  getAllOrdersOfUser
};
