const shortenUrl = require('../models/shortenUrls')
const idToShortUrl = require('../helpers/generateShortUrl')
const validUrl = require('is-url-http')
const baseUrl = process.env.BASE_URL

const urlController = {
  convertUrl: (req, res, next) => {
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
        next(error)
        return res.render('error', { error_message: error.message })
      })
  },
  getOrigin: (req, res, next) => {
    const { shortUrl } = req.params
    shortenUrl
      .findOne({ shortUrl })
      .lean()
      .then(data => {
        if (data) {
          return res.redirect(data.originalUrl)
        } else {
          return res.render('error', {
            error_message: `Url ${process.env.BASE_URL}${shortUrl} does not exist!`
          })
        }
      })
      .catch(error => {
        console.log(error)
        next(error)
        return res.render('error', { error_message: error.message })
      })
  }

}

module.exports = urlController
