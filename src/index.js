const dotenv = require('dotenv');
dotenv.config({ path: `${process.cwd()}/.env` });
const { app } = require('./app.js');
var bodyParser = require('body-parser')
const { liveBiddingJob } = require('./services/localCarsBids.service.js')


app.use(bodyParser.urlencoded({ extended: false }));


//const PORT =  8000;

// app.listen(PORT, () => {
//     console.log('Server up and running', PORT);
// });

// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 3000;

//liveBiddingJob
// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
   console.log('Server up and running', port);
});
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f109435e-ad50-5af7-b738-e3118c755fc8")}catch(e){}}();
//# debugId=f109435e-ad50-5af7-b738-e3118c755fc8
