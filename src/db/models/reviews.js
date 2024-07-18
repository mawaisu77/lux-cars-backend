'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const Reviews = sequelize.define('reviews', 
  {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userID:{
      allowNull: false,
      type: Sequelize.INTEGER
    },
    rating: {
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

module.exports = Reviews