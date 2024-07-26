'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../../config/database');
// const { Hooks } = require('sequelize/lib/hooks');
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const User = sequelize.define('user', 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique:true,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    isEmailVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    emailVerificationToken: {
      type: Sequelize.STRING
    },
    emailVerificationExpiry: {
      type: Sequelize.DATE
    },
    resetPasswordToken: {
      type: Sequelize.STRING
    },
    resetPasswordExpire: {
      type: Sequelize.DATE
    },
    role:{
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user'
    },
    profilePicture: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    documents: {
      type: Sequelize.TEXT, // Store URLs as JSON string
      allowNull: true,
    },
    documentVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    documentVerificationStatus: {
      type: Sequelize.STRING,
      defaultValue: 'pending'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    freezeTableName: true,
    modelName: 'user',
  },
)


User.prototype.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate reset password token
User.prototype.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // Token valid for 10 minutes
  return resetToken;
};

module.exports = User