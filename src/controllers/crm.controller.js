const CRMService = require('../services/crm.service')
const asyncHandler = require('express-async-handler');
const { ApiResponse } = require('../utils/ApiResponse');



const searchContactInCRM =  asyncHandler(async (req, res) => {
    const { email } = req.query
    const contact = await CRMService.searchContactInCRM(email)
    res.status(201).json(new ApiResponse(201, contact, "Contact fetched successfully."));
})

const createCRMContact = asyncHandler(async (req, res) => {
    const user = {
        email: "newContactAssignedToJosh@gmail.com",
        username: "newContactAssignedToJosh",
        phone: "+192938239209"
    }
    const contact = await CRMService.createCRMContact(user)
    res.status(201).json(new ApiResponse(201, contact, "Contact created successfully."));

})

const createNotesInCRMContacts = asyncHandler(async (req, res) => {
    const dev2ID = "CoTCcW1Spd7Sn0HopRnl"
    const devID = "touIFnq4MuRt5cf8wmLM"
    const body = {
        body: "NewNoteToJosh"
    }

    const note = await CRMService.createNotesInCRMContacts(devID, body)
    res.status(201).json(new ApiResponse(201, note, "Note created successfully."));

})

module.exports = {
    createCRMContact,
    searchContactInCRM,
    createNotesInCRMContacts
}