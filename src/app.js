const express = require('express');
const morgan = require('morgan')

const app = express()
app.use(express.json());
app.use(morgan('dev'));


const authRouter = require('./routes/auth.route.js')
app.use("/api/v1", authRouter)

app.use(
    '*',
    async (req, res, next) => {
        res.status(404).json({
            status:"fail",
            message:"No page Found"
        })
    }
);

module.exports = { app };
