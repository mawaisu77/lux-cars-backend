'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const SavedCars = sequelize.define('savedCars', 
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
    lot_id: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.STRING),      
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  
  }
);

module.exports = SavedCars