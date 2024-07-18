'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funds', {
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
      totalDeposits: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      avalaibleDeposits: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bidAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      usedDeposits: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('funds');
  }
};