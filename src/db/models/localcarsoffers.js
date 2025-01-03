'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const LocalCarsOffers = sequelize.define('localCarsOffers', 
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    localCarID: {
      allowNull: false,
      type: Sequelize.UUID
    },
    offerPrice: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    userID: {
      allowNull: false,
      type: Sequelize.UUID
    },
    offerStatus: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: "Pending"
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

module.exports = LocalCarsOffers