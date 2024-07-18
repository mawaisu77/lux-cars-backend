'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const Funds = sequelize.define('funds', 
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
    totalDeposits: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    avalaibleDeposits: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    bidAmount: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    usedDeposits: {
      allowNull: false,
      type: Sequelize.INTEGER
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

module.exports = Funds