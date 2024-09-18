"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const LoanApplications = sequelize.define("loanApplications", {
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
  title: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  firstName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  lastName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING,
  },
  address: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  city: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  yearAtAddress: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  monthsAtAddress: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  cellPhoneNumber: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  workPhoneNumber: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  monthlyPayment: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  residentType: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  vehicleInfo: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  employerName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  employerPhone: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  occupation: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  yearsAtEmployer: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  monthlyIncome: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  bankName: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  accountType: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  financingAmount: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  downPayment: {
    allowNull: false,
    type: Sequelize.BIGINT,
  },
  isTrade: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  isCoApplicant: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  bankForContact: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  timeforContact: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  applicationStatus: {
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

module.exports = LoanApplications;
