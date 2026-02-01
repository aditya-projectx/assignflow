const express = require('express')
const router = express.Router()
const {
    profDash,
} = require('../controllers/proffessor')

router.get('/dash',profDash);

module.exports = router