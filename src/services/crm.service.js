const { axiosCRM } = require("../utils/axiosPrivate")

const createCRMContact = async (req, res) => {
    const sampleData = {
        email: "john@deo.com",
        phone: "+18887324197",
        firstName: "John",
        lastName: "Deo",
        name: "John Deo",
        dateOfBirth: "1990-09-25",
        address1: "3535 1st St N",
        city: "Dolomite",
        state: "AL",
        country: "US",
        postalCode: "35061",
        companyName: "DGS VolMAX",
        website: "35061",
        tags: [
            "aute consequat ad ea",
            "dolor sed"
        ],
        source: "public api",
        customField: {
            "__custom_field_id__": "exercitation"
        }
    } 
}

module.exports = {
    createCRMContact
}