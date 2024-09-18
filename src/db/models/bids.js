'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const Bids = sequelize.define('bids', {

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
    lot_id: {
      allowNull: false,
      type: Sequelize.STRING
    },
    bidPrice: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    isValid: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
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

module.exports = Bids