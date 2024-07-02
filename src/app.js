const express = require('express');
const morgan = require('morgan')
const asyncHandler = require('express-async-handler');
const ApiError = require('./utils/ApiError.js');

const app = express()
app.use(express.json());
app.use(morgan('dev'));


const authRouter = require('./routes/auth.route.js');
const globalErrorHandler = require('./middlewares/errorHandler.js');
app.use("/api/v1", authRouter)

app.use(
    '*',
    asyncHandler(async (req, res, next) => {
        throw new ApiError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);


app.use(globalErrorHandler);


module.exports = { app };
