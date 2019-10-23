// app.js

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const generateTinyURL = require('./generate_tinyURL')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originalURL = req.body
  const tinyURL = generateTinyURL()
  res.render('index', { tinyURL, originalURL })
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})