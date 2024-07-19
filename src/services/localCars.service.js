const { axiosPrivate } = require('../utils/axiosPrivate')
const { shuffleArrays } = require('../utils/helperFunctions')
const dealerRepository = require('../repositories/carDealers.repository');
const logger = require('../utils/logger');

const saveDealerDetails = async (dealerDetails, userID) => {
    const dealer = dealerRepository.getDealerByUserID(userID)
    if(!dealer){
        const {buyerFee, dealershipName, dealershipWebsite, vehicleSalesEachMonth } = dealerDetails
        const dealerData = {
            userID,
            buyerFee,
            dealershipName,
            dealershipWebsite,
            vehicleSalesEachMonth
        }
    }

}

const uploadDocuments = async (req, res) => {

    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, 'No document files provided');
    }
    console.log("+++", req.files)
  
    const uploadResponses = [];
    for (const file of req.files) {
      const localFilePath = file.path;
      const uploadResponse = await uploadOnCloudinary(localFilePath);
      if (uploadResponse) {
        uploadResponses.push(uploadResponse.secure_url);
      }
    }

    return uploadResponses
}

const uploadCar = async (req, res) => {
    try {
        const {carDetails, dealerDetails, titledDetails} = req.body
        console.log(req.files)
        console.log(req.fields)
        if(dealerDetails){
            saveDealerDetails(dealerDetails, req.user.id)
        }

        // const body = {
        //     carDetails:{

        //     },
        //     dealerDetails:{

        //     },

        // }

    } catch (err) {
        logger.error('ERROR INSIDE uploadCar SERVICE')
        console.log('ERROR INSIDE uploadCar SERVICE')
    }
}
module.exports = {
    uploadCar
}