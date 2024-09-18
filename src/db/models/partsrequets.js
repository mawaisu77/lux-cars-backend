"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const PartsRequets = sequelize.define("partsRequets", {
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
  company: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  yearMade: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  model: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  variant: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  location: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  partsDetails: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  partsImages: {
    type: Sequelize.TEXT,
    allowNull: true,
    get() {
      const partsImages = this.getDataValue("partsImages");
      return partsImages ? JSON.parse(partsImages) : [];
    },
    set(value) {
      this.setDataValue("partsImages", JSON.stringify(value));
    },
  },
  status: {
    type: Sequelize.ENUM("pending", "approved", "rejected"),
    default: "pending",
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

module.exports = PartsRequets;
