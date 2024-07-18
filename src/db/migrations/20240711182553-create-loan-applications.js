'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('loanApplications', {
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
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique:true,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      yearAtAddress: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      monthsAtAddress: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cellPhoneNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      workPhoneNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      monthlyPayment: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      residentType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      vehicleInfo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      employerName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      employerPhone: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      occupation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      yearsAtEmployer: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      monthlyIncome: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bankName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      financingAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      downPayment: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isTrade: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isCoApplicant: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      bankForContact: {
        allowNull: false,
        type: Sequelize.STRING
      },
      timeforContact: {
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
    await queryInterface.dropTable('loanApplications');
  }
};