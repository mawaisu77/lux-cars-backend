'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bidCars', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      lot_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carDetails: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      currentBid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      noOfBids: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      auction_date:{
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('bidCars');
  }
};