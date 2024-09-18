const { Router } = require("express");
const { getCarPreview, getCarReportPDF, getCarReportHTML } = require("../controllers/clearvin.controlller");
const router = Router()

router.get('/clearvin/get-car-preview', getCarPreview)
router.get('/clearvin/get-car-report-pdf', getCarReportPDF)
router.get('/clearvin/get-car-report-html', getCarReportHTML)


module.exports = router
