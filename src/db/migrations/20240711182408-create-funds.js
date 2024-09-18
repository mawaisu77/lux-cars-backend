'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funds', {

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
      totalDeposits: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      avalaibleBidAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      usedBidAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      avalaibleBids: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      activeBids:{
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