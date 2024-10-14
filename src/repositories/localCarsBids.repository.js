

const { where } = require("sequelize");
const { Op } = require("sequelize");

const LocalCarsBids = require("../db/models/localcarsbids");

const saveBid = async (bidData) => {
    // saving the bid data to the database
    return await LocalCarsBids.create(bidData);
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

module.exports = {
    saveBid,
    getActiveBidByLocalCarID,
    getAllBidsOnLocalCar
};
