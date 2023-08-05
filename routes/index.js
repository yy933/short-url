const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const errorHandler = require('../helpers/errorHandler')

router.use('/', home)

router.use(errorHandler.errorLogger)
router.use(errorHandler.errorResponder)

module.exports = router
