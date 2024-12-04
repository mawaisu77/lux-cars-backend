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
            "Testing"
        ],
        source: "public api",
        customField: {
            "__custom_field_id__": "exercitation"
        }
    } 

    const contact = await axiosCRM.post("/v1/contacts/", body)
}

const createCRMOpportunity = async (contact) => {

    const body = {
        "title": "Testing",
        "status": "Testing",
        "stageId": "62363159-9710-469f-a011-dbc589287bb7",
        //"email": contact.email,
        //"phone": contact.phone,
        "assignedTo": "gZA5n2GA5cbLI82PQbEu",
        "monetaryValue": 122.22,
        //"source": contact.source,
        //"contactId": contact.id,
        // "name": contact.name,
        // "companyName": contact.companyName,
        // "tags": contact.tags
    }
    const pipelineId = ""
    const opportunity = await axiosCRM.post(`/v1/pipelines/:${pipelineId}/opportunities/`, body)


}

module.exports = {
    createCRMContact,
    createCRMOpportunity
}