const { where } = require('sequelize');
const { Op } = require('sequelize');

const User = require('../db/models/user');

const createUser = async (userData) => {
    return await User.create(userData);
};

const findByEmail = async (email) => {
    return await User.findOne({where : { email }});
};

const update = async (userData) => {
    return await User.update(userData);
};

const findByVerificationToken = async (token) => {
    return await User.findOne({
      where: {
        emailVerificationToken: token,
        emailVerificationExpiry: {
          [Op.gt]: new Date()
        }
      }
    });
};

const findByResetToken = async (resetPasswordToken) => {
    return await User.findOne({
      where: {
        resetPasswordToken,
        resetPasswordExpire: {
          [Op.gt]: new Date() 
        }
      }
    });
  };

module.exports = {
    createUser,
    findByEmail,
    update,
    findByVerificationToken,
    findByResetToken
    // updateUserByEmail,
    // findByVerificationToken,
    // findByEmailWithPassword,
    // findByResetToken
};
