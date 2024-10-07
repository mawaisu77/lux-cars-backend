

const { where } = require("sequelize");
const { Op } = require("sequelize");

const LocalCarsBids = require("../db/models/localcarsbids");

const placeBid = async (bidData) => {
    // saving the bid data to the database
    return await LocalCarsBids.create(bidData);
}

module.exports = {
    placeBid
};
