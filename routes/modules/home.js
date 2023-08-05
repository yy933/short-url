const express = require('express')
const router = express.Router()
const urlController = require('../../controllers/urlController')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// convert to short url and save data
router.post('/', urlController.convertUrl)

// make short url work in the browser
router.get('/:shortUrl', urlController.getOrigin)

router.get('/', (req, res, next) => {
  try {
    return res.render('index')
  } catch (error) { next(error) }
})

module.exports = router
