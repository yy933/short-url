// generate random item from an array
function randomString (array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
// function: convert id to short url
function idToShortUrl () {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  const collection = lowerCaseLetters.split('').concat(upperCaseLetters.split(''), numbers.split(''))
  // generate short url
  let shortUrl = ''
  for (let i = 0; i < 5; i++) {
    shortUrl += randomString(collection)
  }
  return shortUrl
}

module.exports = idToShortUrl
