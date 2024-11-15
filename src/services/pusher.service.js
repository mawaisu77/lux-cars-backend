const { pusher } = require('../config/pusher');
const authRepository = require("../repositories/auth.repository.js");

// Endpoint to send notifications
const pushNotification =  async (Id, message, type, notificationName, notificationChannal) => {
    const channal = notificationChannal + `-${Id}`
    // Trigger a Pusher event on a user-specific channel
    const notification = await pusher.trigger(channal, notificationName, {
        message,
        type
    });

    return notification
};


const pusherAuth = async (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
  
    // Check if the user is authorized to subscribe to this channel
    const userIdFromChannel = channel.split('-').pop();  // For example, private-notifications-123
    const user = await authRepository.findUserById(userIdFromChannel)
    if (user.id !== userIdFromChannel) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    
    // Verify the user's authorization to access this channel
    const auth = pusher.authenticateUser(socketId, user); // Added data parameter
    return auth
};


// router.put('/notifications/mark-read', async (req, res) => {
//     const { notificationId } = req.query;
//     await Notification.update({ read_status: true }, { where: { id: notificationId } });
//     res.status(200).json({ message: 'Notification marked as read' });
// });

// router.get('/get-notifications', async (req, res) => {
//     const PusherClient = require('pusher-js');

//     // Initialize Pusher
//     const pusher = new PusherClient('6d700b541b1d83879b18', {
//         cluster: 'ap2',

//     });

//     // Subscribe to the private channel
//     const userId = "23897423reh92382382";  // Logged-in user's ID
//     const channel = pusher.subscribe(`public-notifications-${userId}`);

//     // Listen for events on the channel
//     channel.bind('new_notification', (data) => {
//         console.log('New notification:', data);
//     });
// })
  
  

                                        
module.exports =  {
    pushNotification,
    pusherAuth
}