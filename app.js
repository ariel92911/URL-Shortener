// app.js

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const generateTinyURL = require('./generate_tinyURL')

mongoose.connect('mongodb://localhost/url', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const Url = require('./models/url')

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
  const link = req.body.url
  Url.findOne({ link: link }).then(url => {
    if (url) {
      return res.render('index', { url })
    } else {
      const newUrl = new Url({
        link: req.body.url,
        shortenLink: generateTinyURL()
      })
      newUrl
        .save()
        .then(url => {
          res.render('index', { url })
        })
        .catch(err => console.log(err))
    }
  })
})

app.get('/:id', (req, res) => {
  Url.findOne({ shortenLink: req.params.id }, (err, url) => {
    if (err) return console.error(err)
    if (!url) {
      let invalidUrl = true
      console.log("無此網址")
      return res.render('index', { invalidUrl })
    } else {
      res.redirect(`${url.link}`)
    }
  })
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})