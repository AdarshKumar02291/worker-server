const express = require('express');
const multer = require('multer');
const UploadController = require('../controllers/uploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), UploadController.uploadCsv);

module.exports = router;