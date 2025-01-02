'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('localCars', 'buyNowPrice', {
      type: Sequelize.STRING, // Adjust precision and scale as needed
      allowNull: true,// Set to false if this field is required
    });

    await queryInterface.addColumn('localCars', 'carDocuments', {
      type: Sequelize.ARRAY(Sequelize.STRING), // Assuming carDocuments is an array of strings
      allowNull: true, // Set to false if this field is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('localCars', 'buyNowPrice');
    await queryInterface.removeColumn('localCars', 'carDocuments');
  }
};