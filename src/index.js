const dotenv = require('dotenv');
const { app } = require('./app.js');

dotenv.config({ path: `${process.cwd()}/.env` });

const PORT =  process.env.APP_PORT;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});
