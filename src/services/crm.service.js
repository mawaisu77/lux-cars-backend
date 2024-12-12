const { axiosCRM } = require("../utils/axiosPrivate")
const  ApiError  = require('../utils/ApiError')

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
        website: "",
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
        console.log(contact.data)

    }catch(error){
        console.log(error)
        throw new ApiError(404, error.message)
    }
    
    const opportunity = await createCRMOpportunity(contact.data.contact)
    console.log(opportunity)
    return contact.data
}

const createCRMOpportunity = async (contact) => {

    const body = {
        title: "Testing",
        status: "open",
        stageId: "80b8a69f-ae51-48ec-9c14-628fd0197466",
        email: contact.email,
        phone: contact.phone,
        //ID for Assignment to Josh
        //assignedTo: "aq1PFf11dBbCvidn3ywj",

        // Currently assigning to AwaisullahDev
        assignedTo: "gZA5n2GA5cbLI82PQbEu",

        monetaryValue: 122.22,
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
        throw new ApiError(404, error.message)
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
        throw new ApiError(404, error.message)
    }

    return note.data
}

module.exports = {
    createCRMContact,
    createCRMOpportunity,
    searchContactInCRM,
    createNotesInCRMContacts
}