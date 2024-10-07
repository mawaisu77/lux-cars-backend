'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('localCarsBids', {
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
      localCarID: {
        allowNull: false,
        type: Sequelize.UUID
      },
      bidPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isValid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      auctionDate: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('localCarsBids');
  }
};