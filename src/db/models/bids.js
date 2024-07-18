'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const Bids = sequelize.define('bids', 
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
    vehicleID: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    bidPrice: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    carDetails: {
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

module.exports = Bids