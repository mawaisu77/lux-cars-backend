'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carDealers', {
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
      buyerFeeDetails: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dealershipName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dealershipWebsite: {
        allowNull: false,
        type: Sequelize.STRING
      },
      vehicleSalesEachMonth: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dealershipLicense: {
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
    await queryInterface.dropTable('carDealers');
  }
};