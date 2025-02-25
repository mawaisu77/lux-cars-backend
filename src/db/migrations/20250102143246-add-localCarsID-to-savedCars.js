'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('savedCars', 'localCarsID', {
    //   allowNull: true,
    //   type: Sequelize.ARRAY(Sequelize.STRING),
    // });
  },

  down: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn('savedCars', 'localCarsID');
  }
};