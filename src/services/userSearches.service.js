const userSearchRepository = require('../repositories/userSearches.repository')
const ApiError = require("../utils/ApiError");

const addUserSearch = async(req, res) => {
    const userId = req.user.id
    const { type, search } = req.body

    const userSearch = await userSearchRepository.getUserSearches(userId)
    if(userSearch){
        if (type === "apiCar") {
            userSearch.apiCarsSearches = [...userSearch.apiCarsSearches, search];
        }
        if (type === "localCar") {
            userSearch.localCarsSearches = [...userSearch.localCarsSearches, search];
        }
        await userSearch.save()
        return userSearch
    }else{
        const newUserSearch = await userSearchRepository.createUserSearch({
            userId: userId,
            localCarsSearches: type === "localCar" ? [search] : [],
            apiCarsSearches: type === "apiCar" ? [search] : []
        })
        return newUserSearch
    }
}

module.exports = {
    addUserSearch
};
