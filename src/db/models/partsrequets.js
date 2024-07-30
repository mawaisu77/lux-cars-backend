'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const PartsRequets = sequelize.define('subscriptions', 
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
    partsDetails: {
      allowNull: false,
      type: Sequelize.STRING
    },
    partsImages: {
      allowNull: false,
      type: Sequelize.STRING
    },
    status: {
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

module.exports = PartsRequets