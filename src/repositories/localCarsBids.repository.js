

const { where } = require("sequelize");
const { Op } = require("sequelize");

const LocalCarsBids = require("../db/models/localcarsbids");

const saveBid = async (bidData, options = {}) => {
    // saving the bid data to the database
    return await LocalCarsBids.create(bidData, options);
}

const getActiveBidByLocalCarID = async(localCarID) => {
    return await LocalCarsBids.findOne({
        where: {
            localCarID: localCarID,
            isValid: true
        }
    })
}

const getAllBidsOnLocalCar = async(localCarID) => {
    return await LocalCarsBids.findAll({
        where: {
            localCarID: localCarID,
        }
    })
}


const getAllBidsOfUser = async(userID) => {
    return await LocalCarsBids.findAll({
        where: {
            userID: userID,
        }
    })
}

module.exports = {
    saveBid,
    getActiveBidByLocalCarID,
    getAllBidsOnLocalCar,
    getAllBidsOfUser
};
