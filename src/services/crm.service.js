const { axiosCRM } = require("../utils/axiosPrivate")
const  ApiError  = require('../utils/ApiError')
const { bidExpirationNoteBidCar, auctionWinsNoteBidCar } = require("../utils/CRMNotesMessages")
const authRepository = require("../repositories/auth.repository")
const bidCarsRepository = require("../repositories/bidCars.repository")

const searchContactInCRM = async (email) => {
    const contact = await axiosCRM.get(`/v1/contacts/lookup?email=${email}`)
    console.log(contact.data)
    if (contact.data) return contact.data

    return 0
}

const createCRMContact = async (user) => {

    const body = {
        email: user.email ,
        phone: user.phone ? user.phone : "",
        firstName: "",
        lastName: "",
        name: user.username,
        dateOfBirth: "",
        address1: user.address ? user.address : "",
        city: "",
        state: "",
        country: "US",
        postalCode: "",
        companyName: "",
        website: "LUXCARS",
        tags: [
            "DEV",
            "Website-SignUp"
        ],
        source: "Website-SignUp",

    } 
    //console.log(body)
    let contact
    try {
        contact = await axiosCRM.post("/v1/contacts/", body)
        console.log(contact.data.contact)

    }catch(error){
        console.log(error.message)
        //throw new ApiError(404, error.message)
    }
    
    const opportunity = await createCRMOpportunity(contact.data.contact)
    console.log(opportunity)
    return contact.data.contact
}

const createCRMOpportunity = async (contact) => {

    const body = {
        title: "Website-SignUp",
        status: "open",
        stageId: "80b8a69f-ae51-48ec-9c14-628fd0197466",
        email: contact.email,
        phone: contact.phone,

        //ID for Assignment to Josh
        // assignedTo: "aq1PFf11dBbCvidn3ywj",

        // Currently assigning to AwaisullahDev
        assignedTo: "gZA5n2GA5cbLI82PQbEu",

        monetaryValue: 0,
        source: contact.source,
        contactId: contact.id,
        name: contact.name,
        companyName: contact.companyName,
        tags: contact.tags
    }
    const pipelineId = "hgEarlCLncaxRYMpEdki"
    let opportunity
    try {
        opportunity = await axiosCRM.post(`/v1/pipelines/${pipelineId}/opportunities/`, body)
        //console.log(opportunity.data)

    }catch(error){
        console.log(error.response)
        return
        //throw new ApiError(404, error.message)
    }
    //console.log(opportunity.data)

    return opportunity.data

}

const createNotesInCRMContacts = async (contactId, body) => {
    let note
    try {
        note = await axiosCRM.post(`/v1/contacts/${contactId}/notes/`, body)
        console.log(note.data)

    }catch(error){
        console.log(error.response)
        return
        //throw new ApiError(404, error.message)
    }

    return note.data
}

const createUserCRMContactNotes = async(userID, lot_id, date, bidPrice, type) => {
    try{
        const user = await authRepository.findUserById(userID)

        let bidCar = await bidCarsRepository.getBidCarByLotID(lot_id)
        bidCar = bidCar.dataValues
        bidCar.carDetails = await JSON.parse(bidCar.carDetails)
        // getting the current bid and the number of bids
        bidCar.carDetails.currentBid = bidCar.currentBid
        bidCar.carDetails.noOfBids = bidCar.noOfBids
        bidCar = (bidCar.carDetails)
        //console.log("---------------------------------",bidCar)
    
        let noteData
        if(type == "ExpireBid"){
            noteData = await bidExpirationNoteBidCar(user.username, lot_id, bidPrice, date, bidCar)
        }else{
            noteData = await auctionWinsNoteBidCar(user.username, lot_id, bidPrice, date, bidCar)
        }

        // need contactID, if no contact exist for the User
        // first create Contact for User then Note in User Contact
        let contactID
        if(!user.contactID){
            const contact = await createCRMContact(user)
            contactID = contact.id
            user.contactID = contactID
            await user.save()
        }else{
            contactID = user.contactID
        }
        // Here to call the actual Function to create Note In CRM Contact of the User
        const note = await createNotesInCRMContacts(contactID, noteData)
        console.log(note)
    }catch(error){
        console.log(error)
    }

}


module.exports = {
    createCRMContact,
    createCRMOpportunity,
    searchContactInCRM,
    createNotesInCRMContacts,
    createUserCRMContactNotes
}