'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const Funds = sequelize.define('funds', {

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
    avalaibleBidAmount: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    usedBidAmount: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    avalaibleBids: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    activeBids:{
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
  
});

module.exports = Funds