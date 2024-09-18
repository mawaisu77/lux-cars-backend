const { where } = require("sequelize");
const { Op } = require("sequelize");

const Bids = require("../db/models/bids");

const saveBid = async (bidData) => {
    // saving the bid data to the database
    return await Bids.create(bidData);
}

const getAllBidsOfUser = async (userID) => {
    return await Bids.findAll({
        where: {
            userID: userID,
        }
    })
}

const getBidToExpireByLotID = async (lot_id) => {
    // getting the bid to expire by lot ID
    return await Bids.findOne({
        where: {
            lot_id: lot_id,
            isValid: true
        }
    })
}

const findAllBidsOnCar = async (lot_id) => {
  return await Bids.findAll({
    where: {
      lot_id: lot_id,
    },
  });
};

const findAllBidsByUser = async (userId) => {
  return await Bids.findAll({
    where: {
      userID: userId,
    },
  });
};

const findUserByBidId = async (bidID) => {
  return await Bids.findOne({
    where: {
      id: bidID,
    },
  });
};

const getUserActiveBids = async (user_id) => {
    // getting the user active bids
    return await Bids.findAll({
        where: {
            userID: user_id,
            isValid: true
        }
    })
}

const getBidsByBidId = async (bidID) => {
  return await Bids.findOne({
    where: {
      id: bidID,
    },
  });
}

module.exports = {
    saveBid,
    getAllBidsOfUser,
    getBidToExpireByLotID,
    getUserActiveBids,
    findAllBidsOnCar,
    findAllBidsByUser,
    findUserByBidId,
    getBidsByBidId
};
