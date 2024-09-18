'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carDealers', {
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