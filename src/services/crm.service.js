const { axiosCRM } = require("../utils/axiosPrivate")

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
        country: "",
        postalCode: "",
        companyName: "",
        website: "",
        tags: [
            "DEV",
            "Website-SignUp"
        ],
        source: "Website-SignUp",

    } 

    const contact = await axiosCRM.post("/v1/contacts/", body)
    createCRMOpportunity(contact)

    return contact
}

const createCRMOpportunity = async (contact) => {

    const body = {
        "title": "Testing",
        "status": "Testing",
        "stageId": "80b8a69f-ae51-48ec-9c14-628fd0197466",
        //"email": contact.email,
        //"phone": contact.phone,
        "assignedTo": "aq1PFf11dBbCvidn3ywj",
        "monetaryValue": 122.22,
        //"source": contact.source,
        //"contactId": contact.id,
        // "name": contact.name,
        // "companyName": contact.companyName,
        // "tags": contact.tags
    }
    const pipelineId = "hgEarlCLncaxRYMpEdki"
    const opportunity = await axiosCRM.post(`/v1/pipelines/:${pipelineId}/opportunities/`, body)

    return opportunity

}

module.exports = {
    createCRMContact,
    createCRMOpportunity
}