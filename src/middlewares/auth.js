const authRepository = require('../repositories/auth.repository')
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken')

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
        return next(new ApiError(401, 'Please login to access this resource'));
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
        const user = await authRepository.findUserById(decoded.id);
        if (!user) {
            return next(new ApiError(401, 'User not found'));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, 'Invalid token'));
    }
});

exports.isAuthenticatedAdmin = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
        return next(new ApiError(401, 'Please login to access this resource'));
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
        const admin = await authRepository.findAdminById(decoded.id);
        if (!admin) {
            return next(new ApiError(401, 'Admin not found'));
        }
        req.admin = admin;
        next();
    } catch (error) {
        return next(new ApiError(401, 'Invalid token'));
    }
});
