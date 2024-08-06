const  Funds  = require('../db/models/funds')

const addFunds = async(fundsData) => {
    return await Funds.create(fundsData);
}

module.exports = {
    addFunds
}