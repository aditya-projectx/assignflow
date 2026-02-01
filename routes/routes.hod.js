const express = require('express')
const router = express.Router()

const {
    hodDash,
} = require('../controllers/hod')

router.get('/dash',hodDash)

module.exports = router