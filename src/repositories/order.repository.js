const Order = require("../db/models/orders");

const findOrderByBidId = async (id) => {
  return await Order.findOne({
    where: {
      bidID: id,
    },
  });
};

const findOrderById = async (id) => {
  return await Order.findByPk(id);
};

const createOrder = async (order) => {
  return await Order.create(order);
};

const findOrders = async () => {
  return await Order.findAll();
};

module.exports = {
  findOrderById,
  createOrder,
  findOrders,
  findOrderByBidId,
};
