"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("loanApplications", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      userID: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      yearAtAddress: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      monthsAtAddress: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      cellPhoneNumber: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      workPhoneNumber: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      monthlyPayment: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      residentType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      vehicleInfo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      employerName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      employerPhone: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      occupation: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      yearsAtEmployer: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      monthlyIncome: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      bankName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      accountType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      financingAmount: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      downPayment: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      isTrade: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      isCoApplicant: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      bankForContact: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      timeforContact: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      applicationStatus: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("loanApplications");
  },
};
