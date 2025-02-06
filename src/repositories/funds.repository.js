const  Funds  = require('../db/models/funds')

const addFunds = async(fundsData, options = {}) => {
    // saving the funds data to the database
    return await Funds.create(fundsData, options);
}

const getUserFunds = async(userID) => {     
    // getting the funds data from the database
    return await Funds.findOne({where: {
        userID: userID
    }})
}

module.exports = {
    addFunds,
    getUserFunds
}