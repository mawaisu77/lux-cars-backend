const express = require('express');
const morgan = require('morgan')
const asyncHandler = require('express-async-handler');
const ApiError = require('./utils/ApiError.js');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(morgan('dev'));


const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const carsRouter = require('./routes/cars.route.js')
const globalErrorHandler = require('./middlewares/errorHandler.js');

app.use("/api/v1", authRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", carsRouter)

app.use(
    '*',
    asyncHandler(async (req, res, next) => {
        throw new ApiError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);


app.use(globalErrorHandler);


module.exports = { app };
