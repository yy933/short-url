const db = require('../../config/mongoose')
const shortenUrl = require('../shortenUrls')
const data = [
  {
    originalUrl: 'https://stackoverflow.com/',
    shortUrl: '5Ghj7'
  },
  {
    originalUrl: 'https://www.w3schools.com/',
    shortUrl: 'rY9i4'
  }
]

db.once('open', () => {
  console.log('mongodb connected!')
  shortenUrl.create(data)
  console.log('done')
})
