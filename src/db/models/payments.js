'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');

const Payments = sequelize.define('payments', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userID: {
    allowNull: false,
    type: Sequelize.UUID,
  },
  paymentPurpose: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: Sequelize.STRING(3),
    allowNull: false,
    defaultValue: 'USD'
  },
  orderID: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  paymentStatus: {
    type: Sequelize.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
    allowNull: false,
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cardType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastFourDigits: {
    type: Sequelize.STRING(4),
    allowNull: true,
  },
  transactionDetails: {
    type: Sequelize.TEXT,
    allowNull: true,
    get() {
      const details = this.getDataValue("transactionDetails");
      return details ? JSON.parse(details) : {};
    },
    set(value) {
      this.setDataValue("transactionDetails", JSON.stringify(value));
    },
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Payments;