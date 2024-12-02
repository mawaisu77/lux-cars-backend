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


const pusherAuthLiveBidding = async (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    
    if(req.user){
        const userData = {
            user_id: req.user.id,
            user_info: {
                name: req.user.username,
                email: req.user.email
            }
        }
        
        // Verify the user's authorization to access this channel
        const auth = pusher.authorizeChannel(socketId, channel, userData); // Added data parameter
    
        res.send(auth)
    }

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
    pusherAuthLiveBidding
}