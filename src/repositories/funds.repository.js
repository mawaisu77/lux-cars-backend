const  Funds  = require('../db/models/funds')

const addFunds = async(fundsData) => {
    return await Funds.create(fundsData);
}

const getUserFunds = async(userID) => {
    return await Funds.findOne({where: {
        userID: userID
    }})
}

module.exports = {
    addFunds,
    getUserFunds
}