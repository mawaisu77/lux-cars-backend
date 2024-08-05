const { where } = require('sequelize');
const { Op } = require('sequelize');

const Bids = require('../db/models/bids');

const saveBid = async (bidData) => {
    return await Bids.create(bidData);
}

const getBidToExpireByLotID = async (lot_id) => {
    return await Bids.findOne({
        where: {
            lot_id: lot_id,
            isValid: true
        }
    })
}

module.exports = {
    saveBid,
    getBidToExpireByLotID
};
