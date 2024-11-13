const Pusher = require('pusher');

const pusher = new Pusher({
   appId: "1894857",
   key: "6d700b541b1d83879b18",
   secret: "7892a31a240cbb7db87a",
   cluster: "ap2",
   useTLS: true
});

module.exports = {
    pusher
}