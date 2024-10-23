'use strict';

const { defaultValueSchemable } = require('sequelize/lib/utils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('localCarsOffers', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      localCarID: {
        allowNull: false,
        type: Sequelize.UUID
      },
      offerPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userID: {
        allowNull: false,
        type: Sequelize.UUID
      },
      offerStatus: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "Pending"
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
    await queryInterface.dropTable('localCarsOffers');
  }
};