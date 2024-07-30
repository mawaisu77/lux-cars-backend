'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const Funds = sequelize.define('funds', 
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userID: {
      allowNull: false,
      type: Sequelize.UUID
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