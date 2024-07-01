'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        username: {
          allowNull: false,
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          unique:true,
          type: Sequelize.STRING
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        isEmailVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        emailVerificationToken: {
          type: Sequelize.STRING
        },
        emailVerificationExpiry: {
          type: Sequelize.DATE
        },
        resetPasswordToken: {
          type: Sequelize.STRING
        },
        resetPasswordExpire: {
          type: Sequelize.DATE
        },
        role:{
          type: Sequelize.ENUM('admin', 'user'),
          defaultValue: 'user'
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
      },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};