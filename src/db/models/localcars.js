'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');


const LocalCars = sequelize.define('localCars', 
  {
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
    buyNowPrice: {
      type: Sequelize.STRING, // Adjust precision and scale as needed
      allowNull: true, // Set to false if this field is required
    },
    carImages: {
      allowNull: false,
      type: Sequelize.ARRAY(Sequelize.STRING),
    },
    carDocuments: {
      type: Sequelize.ARRAY(Sequelize.STRING), // Assuming carDocuments is an array of strings
      allowNull: true, // Set to false if this field is required
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
  
  }
);

module.exports = LocalCars