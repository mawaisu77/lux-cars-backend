"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require("../../config/database");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Admin = sequelize.define("admin", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      this.setDataValue("password", hashedPassword);
    },
  },
  role: {
    type: Sequelize.ENUM("admin", "super-admin"),
    defaultValue: "admin",
  },
});

Admin.prototype.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Admin;
