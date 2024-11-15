const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');
const pusherService = require('../services/pusher.service.js')

const pushNotification = asyncHandler(async (req, res) => {
    const { Id, message, type, notificationName, notificationChannal } = req.body
    const notification = await pusherService.pushNotification(Id, message, type, notificationName, notificationChannal)
    res.status(201).json(new ApiResponse(201, notification, "Notification Pushed Successfully.", ));

})


const pusherAuth = asyncHandler(async (req, res) => {
    const auth = await pusherService.pusherAuth(req, res)
    res.status(201).json(new ApiResponse(201, auth, "Authourized!", ));

})

module.exports = {
    pushNotification,
    pusherAuth
}