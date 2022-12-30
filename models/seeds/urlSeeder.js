const mongoose = require('mongoose')
const shortenUrl = require('../shortenUrls')
const data = [
  {
    originalUrl: "https://stackoverflow.com/",
    shortUrl: "5Ghj7",
  },
  {
    originalUrl: "https://www.w3schools.com/",
    shortUrl: "rY9i4",
  },
];
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

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

db.once('open', () => {
  console.log('mongodb connected!')
  shortenUrl.create(data)
  console.log('done')
})
