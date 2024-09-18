const Parts_Request = require("../db/models/partsrequets");

const createRequest = async (partsRequestPayload) => {
  return await Parts_Request.create(partsRequestPayload);
};

const findAllPartsRequestsByUser = async (userId) => {
  return await Parts_Request.findAll({
    where: {
      userID: userId,
    },
  });
};

const findAllPartsRequests = async () => {
  return await Parts_Request.findAll();
};

const findPartsRequestDetailOfUser = async (id) => {
  return await Parts_Request.findOne({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createRequest,
  findAllPartsRequestsByUser,
  findAllPartsRequests,
  findPartsRequestDetailOfUser,
};
