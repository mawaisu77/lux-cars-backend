'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const CarDealers = sequelize.define('carDealers', 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userID: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    buyerFeeDetails: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dealershipName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dealershipWebsite: {
      allowNull: false,
      type: Sequelize.STRING
    },
    vehicleSalesEachMonth: {
      allowNull: false,
      type: Sequelize.STRING
    },
    dealershipLicense: {
      allowNull: false,
      type: Sequelize.STRING
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
  
  }
);

module.exports = CarDealers