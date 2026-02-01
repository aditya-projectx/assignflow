const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadSingleAssi')

const {
    stuDash,
    assiForm,
    sUpload,
    logout,
} = require('../controllers/student')

router.get('/dash',stuDash)
router.get('/assignments/upload',assiForm)
router.post('/assignments/upload',upload.single('assignmentFile'), sUpload)
router.get('/logout',logout)
module.exports = router;