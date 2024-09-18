"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const invoices = sequelize.define("invoices", {
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
  invoiceType: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  referenceId: {
    allowNull: false,
    type: Sequelize.UUID,
  },
  invoice: {
    type: Sequelize.TEXT,
    allowNull: true,
    get() {
      const invoice = this.getDataValue("invoice");
      return invoice ? JSON.parse(invoice) : [];
    },
    set(value) {
      this.setDataValue("invoice", JSON.stringify(value));
    },
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = invoices;
