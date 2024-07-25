const dotenv = require('dotenv');
dotenv.config({ path: `${process.cwd()}/.env` });
const { app } = require('./app.js');
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }));


// const PORT =  8000;

// app.listen(PORT, () => {
//     console.log('Server up and running', PORT);
// });

// Use PORT provided in environment or default to 3000
const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
   console.log('Server up and running', port);
});
