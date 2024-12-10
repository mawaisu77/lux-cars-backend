const { Router } = require("express");
const { createCRMContact, searchContactInCRM, createNotesInCRMContacts } = require("../controllers/crm.controller");
const router = Router()

router.post('/crm/create-contact', createCRMContact)
router.post('/crm/create-notes', createNotesInCRMContacts)
router.get('/crm/search-conatct', searchContactInCRM)

module.exports = router
