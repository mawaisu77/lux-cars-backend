const express = require("express");
const morgan = require("morgan");
const asyncHandler = require("express-async-handler");
const ApiError = require("./utils/ApiError.js");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, 
    process.env.FRONTEND_URL_ADMIN,
    process.env.FRONTEND_URL_LOCAL
  ] // Your frontend's origin
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));

const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const carsRouter = require("./routes/cars.route.js");
const localCarsRouter = require("./routes/localCars.route.js");
const carDealersRouter = require("./routes/carDealer.route.js");
const reviewsRouter = require("./routes/reviews.route.js");
const clearvinRouter = require("./routes/clearvin.route.js");
const bidCarsRouter = require("./routes/bidCars.route.js");
const bidsRouter = require("./routes/bids.route.js");
const fundsRouter = require("./routes/funds.route.js");
const savedCarsRouter = require("./routes/savedCars.route.js")
const partsRequestRouter = require("./routes/partsRequest.route.js");
const loanApplicationRouter = require("./routes/loanApplications.route.js");
const adminAuthRouter = require("./routes/admin/adminAuth.route.js");
const adminUserRouter = require("./routes/admin/adminUser.route.js");
const adminBidRouter = require("./routes/admin/adminBid.route.js");
const adminOrderRouter = require("./routes/admin/adminOrder.route.js");
const notificationRouter = require("./routes/admin/notificationEmail.route.js");
const adminLoanApplicationRouter = require("./routes/admin/adminLoanApplication.route.js");
const adminPartsRequestsRouter = require("./routes/admin/adminPartsRequest.route.js");
const invoiceRouter = require("./routes/admin/invoice.route.js");

const globalErrorHandler = require("./middlewares/errorHandler.js");

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", carsRouter);
app.use("/api/v1", localCarsRouter);
app.use("/api/v1", carDealersRouter);
app.use("/api/v1", reviewsRouter);
app.use("/api/v1", clearvinRouter);
app.use("/api/v1", bidCarsRouter);
app.use("/api/v1", bidsRouter);
app.use("/api/v1", fundsRouter);
app.use("/api/v1", savedCarsRouter)
app.use("/api/v1", partsRequestRouter);
app.use("/api/v1", loanApplicationRouter);
app.use("/api/v1/admin", adminAuthRouter);
app.use("/api/v1/admin", adminUserRouter);
app.use("/api/v1/admin", adminBidRouter);
app.use("/api/v1/admin", adminOrderRouter);
app.use("/api/v1/admin", notificationRouter);
app.use("/api/v1/admin", adminLoanApplicationRouter);
app.use("/api/v1/admin", adminPartsRequestsRouter);
app.use("/api/v1/admin", invoiceRouter);

app.use(
  "*",
  asyncHandler(async (req, res, next) => {
    throw new ApiError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

module.exports = { app };
