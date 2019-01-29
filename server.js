const PORT = process.env.PORT || 80
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const router = express.Router()

router.get('/', (req, res) => {
  console.time('run')

  const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  console.log('⇨ Request received from:', remoteAddress)

  axios.get('http://3.208.0.37:8888/geo_fortune', {
    headers: {
      'x-forwarded-for': remoteAddress
    }
  })
    .then(response => {
      console.log('🛰️', ' Received data')
      res.send(response.data).end()
      console.timeEnd('run')
    })
    .catch(error => console.log(error))

})

app.use('/', router)
app.listen(PORT)
console.log('NNN.FREEPORT.GEOCINEMA.PROXY started... port:', String(PORT))
