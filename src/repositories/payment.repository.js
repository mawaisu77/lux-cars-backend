const { Op } = require("sequelize");
const Payment = require("../db/models/payments");

const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};

const findPaymentById = async (id) => {
  return await Payment.findByPk(id);
};

const findPaymentsByUserId = async (userID) => {
  return await Payment.findAll({
    where: { userID },
    order: [['createdAt', 'DESC']]
  });
};

const findPaymentByOrderId = async (orderID) => {
  return await Payment.findOne({
    where: { orderID }
  });
};

const findPaymentsByStatus = async (paymentStatus) => {
  return await Payment.findAll({
    where: { paymentStatus }
  });
};

const updatePayment = async (id, paymentData) => {
  return await Payment.update(paymentData, {
    where: { id }
  });
};

module.exports = {
  createPayment,
  findPaymentById,
  findPaymentsByUserId,
  findPaymentByOrderId,
  findPaymentsByStatus,
  updatePayment
};
