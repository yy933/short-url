const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const shortenUrl = require('./models/shortenUrls')
const idToShortUrl = require('./generateShortUrl.js')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT || 3000
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('index')
})

// convert to short url and save data
const hostUrl = `http://localhost:${port}/`
app.post('/', (req, res) => {
  const contentUrl = req.body.originalUrl
  let newUrl
  shortenUrl
    .find()
    .lean()
    .then((data) => {
      // check if the input url already exists in database
      newUrl = data.find((item) => item.originalUrl === contentUrl)
      if (newUrl) {
        newUrl = hostUrl + newUrl.shortUrl
        return res.render('show', { newUrl, contentUrl })
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
      res.render('error', { error_message: error.message })
    })
})

// make short url work in the browser
app.get('/:shortString', (req, res) => {
  const shortString = req.params.shortString
  shortenUrl
    .findOne({ shortUrl: shortString })
    .lean()
    .then((data) => {
      if (data) {
        res.redirect(data.originalUrl)
      }
    })
    .catch((error) => {
      console.log(error)
      res.render('error', { error_message: error.message })
    })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
