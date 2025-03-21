const { axiosPrivate } = require('../utils/axiosPrivate')
const ApiError = require('../utils/ApiError')
const  fundsRepository  = require('../repositories/funds.repository.js')
const { pushNotification } = require("../services/pusher.service.js")
const { addFundMessage } = require("../utils/pusherNotifications.js")
const { processPayment, storePaymentData } = require("../services/payment.service.js")
const { createRefundRequestNote } = require("../services/crm.service.js")
const sequelize = require('../config/database.js');


const checkDepositAndDecideBidLimit = async (_deposit) => {
    let noOfCars;
    const deposit = parseFloat(_deposit)
    const bidLimit = deposit * 10
    if (deposit >= 350 && deposit < 1500) {
        noOfCars = 1;
    } else if (1500 <= deposit && deposit < 2000) {
        noOfCars = 2;
    } else if (2000 <= deposit && deposit < 2500) {
        noOfCars = 3;
    } else if (2500 <= deposit && deposit < 3000) {
        noOfCars = 4;
    } else if (3000 <= deposit && deposit < 3500) {
        noOfCars = 5;
    } else if (3500 <= deposit && deposit < 4000) {
        noOfCars = 6;
    } else if (4000 <= deposit && deposit < 4500) {
        noOfCars = 7;
    } else if (4500 <= deposit && deposit < 5000) {
        noOfCars = 8;
    } else if (5000 <= deposit && deposit < 5500) {
        noOfCars = 9;
    } else if (5500 <= deposit && deposit < 6000) {
        noOfCars = 10;
    } else if (6000 <= deposit && deposit < 6500) {
        noOfCars = 11;
    } else if (6500 <= deposit && deposit < 7000) {
        noOfCars = 12;
    } else if (7000 <= deposit && deposit < 7500) {
        noOfCars = 13;
    } else if (7500 <= deposit && deposit < 8000) {
        noOfCars = 14;
    } else if (8000 <= deposit && deposit < 8500) {
        noOfCars = 15;
    } else if (8500 <= deposit && deposit < 9000) {
        noOfCars = 16;
    } else if (9000 <= deposit && deposit < 9500) {
        noOfCars = 17;
    } else if (9500 <= deposit && deposit <= 10000) {
        noOfCars = 18;
    }else if (deposit > 10000){
        throw new Error(`Cannot add depoists more the $10000, Your total deposits after adding the current ones are $${deposit}`);

    }
    else {
        // Add a default case or throw an error if no condition is met
        throw new Error("Invalid deposit amount");
    }

    return { bidLimit, noOfCars };
};


const addFunds = async (req, res) => {
    
    // getting the user ID from the request
    const userID = req.user.id
    const { deposit } = req.body
    let userFunds = await fundsRepository.getUserFunds(userID)
    const _deposit = parseFloat(deposit)

    // console.log(userFunds.dataValues)
    if(!userFunds){

        if(_deposit < 350) throw new Error("Deposit amount is too low, at least add $350");
        else if(_deposit > 10000) throw new Error("Deposit amount is too high, you can add max $10000");

        const _funds = await checkDepositAndDecideBidLimit(_deposit)

        // creating a transaction
        const transaction = await sequelize.transaction();

        // adding the funds to the user
        const funds = await fundsRepository.addFunds({
            userID: userID,
            totalDeposits: _deposit,
            avalaibleBidAmount: _funds.bidLimit,
            usedBidAmount: 0,
            avalaibleBids: _funds.noOfCars,
            activeBids: 0
        }, { transaction })

        if(await processPayment(req, res)){
            await transaction.commit();
            await storePaymentData(req, "Funds Addition")
        }else{
            await transaction.rollback();
            throw new Error("Payment failed");
        }

        const userMessage = await addFundMessage(_deposit)
        pushNotification(userID, userMessage, "Funds Addition", "user-notifications", "public-notification")

        // returning the funds
        return funds
        
    }
    else{
        const _funds = await checkDepositAndDecideBidLimit(_deposit + userFunds.totalDeposits)

        // creating a transaction
        const transaction = await sequelize.transaction();

        // adding the funds to the user
        if ((userFunds.totalDeposits + _deposit) <= 10000){
            userFunds.totalDeposits += _deposit,
            userFunds.avalaibleBidAmount = _funds.bidLimit - userFunds.usedBidAmount
            userFunds.avalaibleBids = _funds.noOfCars - userFunds.activeBids
            await userFunds.save({ transaction })
        }else{
            throw new Error(`Deposit amount is too high, you can add max $10000, you already have deposited $${userFunds.totalDeposits}, the max amount you can add more is $${10000 - userFunds.totalDeposits}  `);
        }

        if(await processPayment(req, res)){
            await transaction.commit();
            await storePaymentData(req, "Funds Addition")
        }else{
            await transaction.rollback();
            throw new Error("Payment failed");
        }

        const userMessage = await addFundMessage(_deposit)
        pushNotification(userID, userMessage, "Funds Addition", "user-notifications", "public-notification")

        // returning the funds
        return userFunds

    }


}


const addFundsToUser = async (userId, amount, options = {}) => {
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userId);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }

    // adding the funds to the user
    userFunds.avalaibleBidAmount = Number(userFunds.avalaibleBidAmount) + Number(amount);
    userFunds.usedBidAmount = Number(userFunds.usedBidAmount) - Number(amount);
    userFunds.activeBids = Number(userFunds.activeBids) - 1;
    userFunds.avalaibleBids = Number(userFunds.avalaibleBids) + 1;

    // saving the funds to the database
    return await userFunds.save(options);
}


const removeFundsFromUser = async (userId, amount, options = {}) => {
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userId);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }

    // checking if the user has enough funds
    if (Number(userFunds.avalaibleBidAmount) < Number(amount)) {
        throw new ApiError(400, 'You need more bid amount to place a bid');
    }

    // checking if the user has enough bids
    if (Number(userFunds.avalaibleBids) < 1) {
        throw new ApiError(400, 'You need more bids to place a bid');
    }

    // removing the funds from the user
    userFunds.avalaibleBidAmount = Number(userFunds.avalaibleBidAmount) - Number(amount);
    userFunds.usedBidAmount = Number(userFunds.usedBidAmount) + Number(amount);
    userFunds.activeBids = Number(userFunds.activeBids) + 1;
    userFunds.avalaibleBids = Number(userFunds.avalaibleBids) - 1;
    
    // saving the funds to the database
    return await userFunds.save(options);
}


const refundUserFunds = async (req, res) => {
    const userId = req.user.id
    if(!userId) throw new ApiError(400, 'User ID is required');
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userId);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }

    // checking if the user has reached their max used bids and used bid amount is 0
    if (Number(userFunds.activeBids) === 0 && Number(userFunds.usedBidAmount) === 0) {

        createRefundRequestNote(req.user.username, userFunds.totalDeposits, req.user.contactID)

        // refunding the user
        userFunds.avalaibleBidAmount = 0;
        userFunds.usedBidAmount = 0;
        userFunds.activeBids = 0;
        userFunds.avalaibleBids = 0
        userFunds.totalDeposits = 0;

        // saving the funds to the database
        const updatedUserFunds = await userFunds.save();
        return updatedUserFunds;
    } else {
        throw new ApiError(400, 'You should not have any active bids or used bid amount to get the refund');
    }
}


const getUserFunds = async (req, res) => {
    // getting the user ID from the request
    const userID = req.user.id;
    // getting the user funds from the database
    const userFunds = await fundsRepository.getUserFunds(userID);
    // checking if the user funds are found
    if (!userFunds) {
        throw new ApiError(404, 'User funds not found');
    }
    // returning the user funds
    return userFunds;
}


module.exports = {
    addFunds,
    getUserFunds,
    addFundsToUser,
    removeFundsFromUser,
    refundUserFunds
}