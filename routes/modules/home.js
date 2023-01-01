const express = require('express')
const router = express.Router()
const shortenUrl = require('../../models/shortenUrls')
const idToShortUrl = require('../../generateShortUrl')
const isUrl = require('nice-is-url')
const port = process.env.PORT || 3000

router.get('/', (req, res) => {
  return res.render('index')
})

// convert to short url and save data
const hostUrl = `http://localhost:${port}/`
router.post('/', (req, res) => {
  const contentUrl = req.body.originalUrl
  const invalidUrl = isUrl(contentUrl) === false
  let newUrl
  if (invalidUrl) {
    console.log('Not a valid url!')
    res.render('index', { contentUrl, invalidUrl })
    return res.status(404)
  }
  shortenUrl
    .find()
    .lean()
    .then((data) => {
      // check if the input url already exists in database
      newUrl = data.find((item) => item.originalUrl === contentUrl)
      if (newUrl) {
        newUrl = hostUrl + newUrl.shortUrl
        return 
      }
      // if short string already existed, regenerate a random short string
      let shortString = idToShortUrl()
      if (data.some((item) => item.shortUrl === shortString)) {
        shortString = idToShortUrl()
      }
      newUrl = hostUrl + shortString
      // create new data
      shortenUrl.create({
        originalUrl: contentUrl,
        shortUrl: shortString
      })
    })
    .then(() => res.render('show', { newUrl, contentUrl }))
    .catch((error) => {
      console.log(error)
      return res.render('error', { error_message: error.message })
    })
})

// make short url work in the browser
router.get('/:shortString', (req, res) => {
  const shortString = req.params.shortString
  shortenUrl
    .findOne({ shortUrl: shortString })
    .lean()
    .then((data) => {
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
