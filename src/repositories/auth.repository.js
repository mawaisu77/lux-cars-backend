const { where } = require("sequelize");
const { Op } = require("sequelize");

const User = require("../db/models/user");
const Admin = require("../db/models/admin");

const createUser = async (userData) => {
  return await User.create(userData);
};

const findByEmail = async (email, includePassword = false) => {
  if (includePassword) {
    return await User.scope('withPassword').findOne({ where: { email } });
  }
  return await User.findOne({ where: { email } });
};

const update = async (userData) => {
  return await User.update(userData);
};

const findByVerificationToken = async (token) => {
  return await User.findOne({
    where: {
      emailVerificationToken: token,
      emailVerificationExpiry: {
        [Op.gt]: new Date(),
      },
    },
  });
};

const findByResetToken = async (resetPasswordToken) => {
  return await User.findOne({
    where: {
      resetPasswordToken,
      resetPasswordExpire: {
        [Op.gt]: new Date(),
      },
    },
  });
};

const findUserById = async (id) => {
  return await User.findByPk(id);
};

const findAdminByEmail = async (email) => {
  return await Admin.findOne({ where: { email } });
};

const createAdmin = async (adminData) => {
  return await Admin.create(adminData);
};

const findAdminById = async (id) => {
  return await Admin.findByPk(id);
};

const findByDocumentStatus = async () => {
  return await User.findAll({
    where: {
      documentVerificationStatus: "pending",
      documents: {
        [Op.ne]: null,
      },
    },
  });
};

const findAllUsers = async () => {
  return await User.findAll();
};

const findAllAdmins = async () => {
  return await Admin.findAll();
};

module.exports = {
  createUser,
  findByEmail,
  update,
  findByVerificationToken,
  findByResetToken,
  findUserById,
  findAdminByEmail,
  createAdmin,
  findByDocumentStatus,
  findAdminById,
  findAllUsers,
  findAllAdmins,
};
