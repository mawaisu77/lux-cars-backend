require("./utils/instrument.js");
const Sentry = require("@sentry/node");
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
    process.env.FRONTEND_URL_LOCAL,
    process.env.FRONTEND_URL_LOCAL_USER,
    ///Users/apple/Desktop/lux-cars-backend/src/utils/notification.html,
    "*",
  ], // Your frontend's origin
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));

const invoiceUserRouter = require('./routes/invoice.route.js')
const liveAuctionRouter = require('./routes/liveAuction.route.js')
const userOrderRouter = require("./routes/orders.routes.js");
const pusherRuter = require("./routes/pusher.route.js");
const CRMRouter = require("./routes/crm.route.js");
const authRouter = require("./routes/auth.route.js");
const userRouter = require("./routes/user.route.js");
const carsRouter = require("./routes/cars.route.js");
const localCarsRouter = require("./routes/localCars.route.js");
const localCarsOffersRouter = require("./routes/localCarsOffers.routes.js");
const carDealersRouter = require("./routes/carDealer.route.js");
const reviewsRouter = require("./routes/reviews.route.js");
const clearvinRouter = require("./routes/clearvin.route.js");
const bidCarsRouter = require("./routes/bidCars.route.js");
const bidsRouter = require("./routes/bids.route.js");
const localCarsBidsRouter = require("./routes/localCarsBids.routes.js");
const fundsRouter = require("./routes/funds.route.js");
const savedCarsRouter = require("./routes/savedCars.route.js");
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
const adminLocalCarsRouter = require("./routes/admin/adminLocalCars.route.js");
const paymentRouter = require("./routes/payment.route.js");
const userSearchRouter = require("./routes/userSearches.route.js")

const globalErrorHandler = require("./middlewares/errorHandler.js");

app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", carsRouter);
app.use("/api/v1", localCarsRouter);
app.use("/api/v1", localCarsOffersRouter);
app.use("/api/v1", carDealersRouter);
app.use("/api/v1", reviewsRouter);
app.use("/api/v1", clearvinRouter);
app.use("/api/v1", bidCarsRouter);
app.use("/api/v1", bidsRouter);
app.use("/api/v1", fundsRouter);
app.use("/api/v1", savedCarsRouter);
app.use("/api/v1", partsRequestRouter);
app.use("/api/v1", loanApplicationRouter);
app.use("/api/v1", liveAuctionRouter)
app.use("/api/v1", localCarsBidsRouter);
app.use("/api/v1", pusherRuter);
app.use("/api/v1", CRMRouter);
app.use("/api/v1", userOrderRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", invoiceUserRouter)
app.use("/api/v1", userSearchRouter)
app.use("/api/v1/admin", adminAuthRouter);
app.use("/api/v1/admin", adminUserRouter);
app.use("/api/v1/admin", adminBidRouter);
app.use("/api/v1/admin", adminOrderRouter);
app.use("/api/v1/admin", notificationRouter);
app.use("/api/v1/admin", adminLoanApplicationRouter);
app.use("/api/v1/admin", adminPartsRequestsRouter);
app.use("/api/v1/admin", invoiceRouter);
app.use("/api/v1/admin", adminLocalCarsRouter);

app.use("/", async (req, res) => {
  res.send("Hello from LuxCars Backend Services!");
});
app.use(
  "*",
  asyncHandler(async (req, res, next) => {
    throw new ApiError(404, `Can't find ${req.originalUrl} on this server`);
  })
);

Sentry.setupExpressErrorHandler(app);
app.use(globalErrorHandler);

module.exports = { app };
