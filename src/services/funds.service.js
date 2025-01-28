const { axiosPrivate } = require('../utils/axiosPrivate')
const ApiError = require('../utils/ApiError')
const  bidsPackages  = require('../utils/bidPackagesConfig.js')
const  fundsRepository  = require('../repositories/funds.repository.js')
const { pushNotification } = require("../services/pusher.service.js")
const { addFundMessage } = require("../utils/pusherNotifications.js")

const checkDepositAndDecideBidLimit = async (deposit) => {
    let noOfCars;
    const bidLimit = deposit * 10

    // if (deposit >= 350 && deposit < 1500) {
    //     noOfCars = 1;
    // } else if (1500 <= deposit && deposit < 2000) {
    //     noOfCars = 2;
    // } else if (2000 <= deposit && deposit < 2500) {
    //     noOfCars = 3;
    // } else if (2500 <= deposit && deposit < 3000) {
    //     noOfCars = 4;
    // } else if (3000 <= deposit && deposit < 3500) {
    //     noOfCars = 5;
    // } else if (3500 <= deposit && deposit < 4000) {
    //     noOfCars = 6;
    // } else if (4000 <= deposit && deposit < 4500) {
    //     noOfCars = 7;
    // } else if (4500 <= deposit && deposit < 5000) {
    //     noOfCars = 8;
    // } else if (5000 <= deposit && deposit < 5500) {
    //     noOfCars = 9;
    // } else if (5500 <= deposit && deposit < 6000) {
    //     noOfCars = 10;
    // } else if (6000 <= deposit && deposit < 6500) {
    //     noOfCars = 11;
    // } else if (6500 <= deposit && deposit < 7000) {
    //     noOfCars = 12;
    // } else if (7000 <= deposit && deposit < 7500) {
    //     noOfCars = 13;
    // } else if (7500 <= deposit && deposit < 8000) {
    //     noOfCars = 14;
    // } else if (8000 <= deposit && deposit < 8500) {
    //     noOfCars = 15;
    // } else if (8500 <= deposit && deposit < 9000) {
    //     noOfCars = 16;
    // } else if (9000 <= deposit && deposit < 9500) {
    //     noOfCars = 17;
    // } else if (9500 <= deposit && deposit < 100000) {
    //     noOfCars = 18;
    // } 
    // else {
    //     // Add a default case or throw an error if no condition is met
    //     throw new Error("Invalid deposit amount");
    // }

    noOfCars = Math.max(2, Math.floor((deposit - 1500) / 500) + 2);

    return { bidLimit, noOfCars };
};


const addFunds = async (req, res) => {
        // getting the user ID from the request
    const userID = req.user.id
    const { deposit } = req.body
    let userFunds = await fundsRepository.getUserFunds(userID)
    console.log(userFunds.dataValues)
    if(!userFunds){

        if(deposit < 350) throw new Error("Deposit amount is too low, at least add $350");
        else if(deposit > 10000) throw new Error("Deposit amount is too high, you can add max $10000");

        const _funds = await checkDepositAndDecideBidLimit(deposit)

        // adding the funds to the user
        const funds = await fundsRepository.addFunds({
            userID: userID,
            totalDeposits: deposit,
            avalaibleBidAmount: _funds.bidLimit,
            usedBidAmount: 0,
            avalaibleBids: _funds.noOfCars,
            activeBids: 0
        })

        const userMessage = await addFundMessage(packages[package].deposit)
        pushNotification(userID, userMessage, "Funds Addition", "user-notifications", "public-notification")

        // returning the funds
        return funds
        
    }
    else{
        const _funds = await checkDepositAndDecideBidLimit(deposit + userFunds.totalDeposits)

        // adding the funds to the user
        if ((userFunds.totalDeposits + deposit) <= 10000){
            userFunds.totalDeposits += deposit,
            userFunds.avalaibleBidAmount += _funds.bidLimit
            userFunds.avalaibleBids += _funds.noOfCars
            await userFunds.save()
        }else{
            throw new Error(`Deposit amount is too high, you can add max $10000, you already have deposited $${userFunds.totalDeposits}, the max amount you can add more is $${10000 - userFunds.totalDeposits}  `);
        }


        const userMessage = await addFundMessage(deposit)
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
    userFunds.avalaibleBidAmount += amount;
    userFunds.usedBidAmount -= amount;
    userFunds.activeBids -= 1;
    userFunds.avalaibleBids += 1;

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
    if (userFunds.avalaibleBidAmount < amount) {
        throw new ApiError(400, 'Insufficient funds');
    }

    // removing the funds from the user
    userFunds.avalaibleBidAmount -= amount;
    userFunds.usedBidAmount += amount;
    userFunds.activeBids += 1;
    userFunds.avalaibleBids -= 1;
    
    // saving the funds to the database
    return await userFunds.save(options);
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
    removeFundsFromUser
}