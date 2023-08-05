const express = require('express')
const router = express.Router()
const shortenUrl = require('../../models/shortenUrls')
const idToShortUrl = require('../../generateShortUrl')
const validUrl = require('is-url-http')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

router.get('/', (req, res) => {
  return res.render('index')
})

// convert to short url and save data
const baseUrl = process.env.BASE_URL
router.post('/', (req, res) => {
  const { originalUrl } = req.body
  const isValidUrl = validUrl(originalUrl)
  let newUrl
  if (!isValidUrl) {
    console.log('Not a valid url!')
    res.render('index', { originalUrl, invalidUrl: true })
    return res.status(404)
  }
  shortenUrl
    .find()
    .lean()
    .then(data => {
      // check if the input url already exists in database
      newUrl = data.find(item => item.originalUrl === originalUrl)
      if (newUrl) {
        newUrl = baseUrl + newUrl.shortUrl
        return
      }
      // if short string already existed, regenerate a random short string
      let shortString = idToShortUrl()
      if (data.some(item => item.shortUrl === shortString)) {
        shortString = idToShortUrl()
      }
      newUrl = baseUrl + shortString
      // create new data
      shortenUrl.create({
        originalUrl,
        shortUrl: shortString
      })
    })
    .then(() => res.render('show', { newUrl, originalUrl }))
    .catch((error) => {
      console.log(error)
      return res.render('error', { error_message: error.message })
    })
})

// make short url work in the browser
router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params
  shortenUrl
    .findOne({ shortUrl })
    .lean()
    .then(data => {
      if (data) {
        return res.redirect(data.originalUrl)
      }
    })
    .catch((error) => {
      console.log(error)
      return res.render('error', { error_message: error.message })
    })
})

module.exports = router
