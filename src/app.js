const express = require('express');
const morgan = require('morgan')
const asyncHandler = require('express-async-handler');
const ApiError = require('./utils/ApiError.js');
const cors = require("cors")

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend's origin
    credentials: true, // Allow credentials
  };
  

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(morgan('dev'));


const authRouter = require('./routes/auth.route.js');
const userRouter = require('./routes/user.route.js');
const carsRouter = require('./routes/cars.route.js');
const localCarsRouter = require('./routes/localCars.route.js')
const carDealersRouter = require('./routes/carDealer.route.js')
const globalErrorHandler = require('./middlewares/errorHandler.js');

app.use("/api/v1", authRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", carsRouter)
app.use("/api/v1", localCarsRouter)
app.use("/api/v1", carDealersRouter)

app.use(
    '*',
    asyncHandler(async (req, res, next) => {
        throw new ApiError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);


app.use(globalErrorHandler);


module.exports = { app };
