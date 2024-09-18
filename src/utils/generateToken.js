const jwt = require("jsonwebtoken")

function generateToken(user) {
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY
    });
    return token;
}

module.exports = {generateToken}
