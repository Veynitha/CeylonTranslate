const {getPdf, downloadPdf} = require('../controllers/pdfController')
const router = require('express').Router()
//multer config
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage}) 


//Routes
//pdf 
router.post('/api/translate-pdf', upload.single('file'),getPdf)
router.get('/api/download-pdf', downloadPdf)


module.exports = router;