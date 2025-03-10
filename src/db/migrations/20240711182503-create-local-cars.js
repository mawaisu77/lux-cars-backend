'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('localCars', 'auction_date', {
    //   type: Sequelize.DATE,
    //   allowNull: true, // or false, depending on your requirements
    // });
    await queryInterface.createTable('localCars', {
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
      vin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      make: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      transmission: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mileage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      modification: {
        type: Sequelize.STRING
      },
      significantFlaws: {
        type: Sequelize.STRING
      },
      carLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carState: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isCarForSale: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      carTitledAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carTitledInfo: {
        type: Sequelize.STRING,
        defaultValue: "Yes, The vehicle is titled on my name."
      },
      titlesStatus: {
        allowNull: false,
        type: Sequelize.STRING
      },
      minPrice: {
        allowNull: false,
        type: Sequelize.STRING
      },
      carImages: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      referral: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "UnApproved"
      },
      currentBid:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      noOfBids:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },    
      auction_date:{
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('localCars');
  }
};