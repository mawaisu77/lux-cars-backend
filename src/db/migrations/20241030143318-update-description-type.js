'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('localCars', 'description', {
      type: Sequelize.TEXT, // Change this to the new type you want
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('localCars', 'description', {
      type: Sequelize.STRING, // Change this back to the original type
      allowNull: false,
    });
  }
};