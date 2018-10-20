const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')
require('./config/mongodb')

const port = process.env.PORT || 3000

app.mongoose = mongoose

consign()
  .then('./config/middlewares.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

app.listen(port, () => {
  console.log('Backend executando...')
})
