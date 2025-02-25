'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const UserSearch = sequelize.define('userSearch', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false  
  },
  localCarsSearches: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  apiCarsSearches: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }

})

module.exports = UserSearch