const { where } = require('sequelize');
const { Op } = require('sequelize');

const UserSearch = require('../db/models/usersearch.js');

const createUserSearch = async (searchData) => {
    // creating a new user search data to the database
    return await UserSearch.create(searchData);
};

const getAllUserSearches = async () => {
    return await UserSearch.findAll();

}

const updateUserSearch = async (searchData, userId) => {
  // getting the user search data from the database
  const userSearchToUpdate = await getUserSearches(userId);
  // updating the user search data
  return await userSearchToUpdate.update(searchData);
};



const getUserSearches = async (userId) => {
    return await UserSearch.findOne({ where: {userId: userId} });
}


module.exports = {
    createUserSearch,
    getUserSearches,
    getAllUserSearches,
    updateUserSearch
};
