'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('localCars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      vin: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      make: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      transmission: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mileage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      modification: {
        type: Sequelize.STRING
      },
      significantFlaws: {
        type: Sequelize.STRING
      },
      carLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isCarForSale: {
        type: Sequelize.STRING,
        Array: true,
        default: []
      },
      carTitledAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carTitledInfo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      titlesStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      minPrice: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carImages: {
        allowNull: false,
        type: Sequelize.STRING,
        Array: true,
        default: []
      },
      referral: {
        allowNull: false,
        type: Sequelize.STRING,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('localCars');
  }
};