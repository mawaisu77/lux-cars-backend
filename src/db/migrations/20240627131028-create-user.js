'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(`
    //   CREATE TYPE "enum_user_documentVerificationStatus" AS ENUM ('pending', 'verified', 'rejected')
    // `);
    await queryInterface.createTable('user',
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
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
        profilePicture: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        documents: {
          type: Sequelize.TEXT, // Store URLs as JSON string
          allowNull: true,
        },
        documentVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        documentVerificationStatus: {
          type: Sequelize.STRING,
          defaultValue: 'pending'
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
  // Use raw SQL to drop the enum type
  // await queryInterface.sequelize.query(`
  //   DROP TYPE "enum_user_documentVerificationStatus"
  // `);
  }
};