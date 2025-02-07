'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Revert the column type if needed
    await queryInterface.removeColumn('localCars', 'mileage', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    // Change column type to INTEGER
    await queryInterface.addColumn('localCars', 'mileage', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

};