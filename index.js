require('dotenv').config()
const { APP_PORT, APP_URL } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const response = require('./src/helper/response')

// Import Routes
const user = require('./src/route/user/userDetail')
const topik = require('./src/route/topics/topik')

// Allowed All
app.use(cors('*'))

// static link to get image
app.use('/avatar/profile', express.static('public/photo profile'))

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// App Routes
app.use('/users', user)
app.use('/topics', topik)

// Error Route
app.get('*', (req, res) => {
  res.status(404).send(response({
    msg: 'Page not found'
  }))
})

// Run Server
app.listen(APP_PORT || 3300, () => {
  console.log(`Server run on port ${APP_PORT}`)
  console.log(`Rest api URL:  ${APP_URL}:${APP_PORT}`)
})