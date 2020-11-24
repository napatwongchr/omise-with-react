const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = 3001

var omise = require('omise')({
  'secretKey': process.env.OMISE_SECRET_KEY,
  'omiseVersion': '2015-09-10'
});

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/charge', (req, res) => {
  const tokenId = req.body.token
  const amount = req.body.amount
  omise.charges.create({
    'description': 'Charge for order ID: 00001',
    'amount': amount, 
    'currency': 'thb',
    'capture': true,
    'card': tokenId
  }, function(err, resp) {
    res.send({
      id: resp.id
    })
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})