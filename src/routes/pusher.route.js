const { Router } = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const { pushNotification, pusherAuthLiveBidding} = require('../controllers/pusher.controller.js')
const router = Router()

// Endpoint to send notifications
router.post('/pusher/push-notifications', pushNotification)


router.post('/pusher/auth/live-bidding', pusherAuthLiveBidding)


router.post('/notifications/mark-read', async (req, res) => {
    const { notificationId } = req.body;
    await Notification.update({ read_status: true }, { where: { id: notificationId } });
    res.status(200).json({ message: 'Notification marked as read' });
});

router.get('/get-notifications', async (req, res) => {
    const PusherClient = require('pusher-js');

    // Initialize Pusher
    const pusher = new PusherClient('6d700b541b1d83879b18', {
        cluster: 'ap2',

    });

    // Subscribe to the private channel
    const userId = "23897423reh92382382";  // Logged-in user's ID
    const channel = pusher.subscribe(`public-notifications-${userId}`);

    // Listen for events on the channel
    channel.bind('new_notification', (data) => {
        console.log('New notification:', data);
    });
})
  
  

                                        
module.exports =  router