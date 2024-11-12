const { Router } = require("express");
const { isAuthenticatedUser } = require("../middlewares/auth.js");
const router = Router()
const Pusher = require('pusher');

const pusher = new Pusher({
   appId: "1894857",
   key: "6d700b541b1d83879b18",
   secret: "7892a31a240cbb7db87a",
   cluster: "ap2",
   useTLS: true
});

// Endpoint to send notifications
router.post('/notifications/send', async (req, res) => {
    const { userId, message, type } = req.body;

    // Trigger a Pusher event on a user-specific channel
    pusher.trigger(`public-notifications-${userId}`, 'new_notification', {
        message,
        type
    });

    res.status(200).json({ message: 'Notification sent successfully' });
});


router.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
  
    // Check if the user is authorized to subscribe to this channel
    const userIdFromChannel = channel.split('-').pop();  // For example, private-notifications-123
    if (user.id !== userIdFromChannel) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    
    // Verify the user's authorization to access this channel
    const auth = pusher.authenticate(socketId, channel, { user_id: req.user.id }); // Added data parameter
    res.send(auth);
});


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