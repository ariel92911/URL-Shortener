// generate_tinyURL.js
// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define generateTinyURL function
function generateTinyURL() {

  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  const collection = characters.split('')

  let tinyURL = ''
  for (let i = 0; i < 5; i++) {
    tinyURL += sample(collection)
  }

  return tinyURL
}

module.exports = generateTinyURL