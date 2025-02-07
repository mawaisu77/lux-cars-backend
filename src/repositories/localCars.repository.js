const { where, Op, col } = require("sequelize"); // Ensure only col is imported
const LocalCars = require("../db/models/localcars");
const { query } = require("express");
const sequelize = require('../config/database.js');


const getAllCars = async() => {
  return await LocalCars.findAll()
}

const createLocalCar = async (carData) => {
  // saving the car data to the database
  return await LocalCars.create(carData);
};

const getCarByID = async (carID) => {
  // getting the car data from the database
  return await LocalCars.findByPk(carID);
};

const updateCar = async (carData, carID) => {
  // getting the car data from the database
  const carToUpdate = await getCarByID(carID);
  // updating the car data
  return await carToUpdate.update(carData);
};

const getUserAllLocalCars = async (id) => {
  // getting all the cars from the database
  return await LocalCars.findAll({ where: { userID: id } });
};

const getAllUnApprovedLocalCars = async () => {
  return await LocalCars.findAll({ where: { status: "UnApproved" } });
};

const getAllLocalCars = async (_query) => {

  const { size = 10, page = 1, ...query } = {..._query};
  //console.log(query)
  const cars = await LocalCars.findAll({ 
    where: {      
      [Op.and]: [
        ...Object.keys(query).map(key => {
          console.log(key)
          if (key == "minPrice"){
            return [{ [key]: { [Op.not]: null } }]
          } else if (key == "buyNowPrice"){
            return [{ [key]: { [Op.not]: null } }]
          }
          else if (typeof query[key] === 'string' && query[key] !== "" && query[key] !== null) {
            return { [key]: { [Op.iLike]: query[key].toLowerCase() } };
          } else if (query[key] !== undefined && query[key] !== null) {
            return { [key]: query[key] };
          }
          return null;
        }).filter(Boolean),
      ]
    },
    limit: size,
    offset: (page - 1) * size
  });
  const totalLength = await LocalCars.count({
    where: {      
      [Op.and]: Object.keys(query).map(key => {
        if (key == "minPrice"){
          return [{ [key]: { [Op.not]: [null, "", ''] } }]
        } else if (key == "buyNowPrice"){
          return [{ [key]: { [Op.not]: [null, ""] } }]
        } else if (typeof query[key] === 'string' && query[key]) {
          return { [key]: { [Op.iLike]: query[key].toLowerCase() } };
        } else if (query[key] !== undefined) {
          return { [key]: query[key] };
        }
        return null;
      }).filter(Boolean),
    }
  });
  return { cars, totalLength };
};

const changeCarStatus = async (carID, auction_date) => {
  return await LocalCars.update(
    { 
      status: "Approved",
      auction_date: auction_date
    },
    { where: { id: carID } }
  );
};

const getFutureAuctionCars = async () => {
  return await LocalCars.findAll({
    where: {
      auction_date: {
        [Op.gte]: new Date()
      }
    }
  });
};

const getCarsForAuctionToday = async () => {
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  return await LocalCars.findAll({
    where: {
      auction_date: todayDate
    }
  });
};



module.exports = {
  createLocalCar,
  getCarByID,
  updateCar,
  getUserAllLocalCars,
  getAllUnApprovedLocalCars,
  getAllLocalCars,
  changeCarStatus,
  getFutureAuctionCars,
  getCarsForAuctionToday,
  getAllCars
};
