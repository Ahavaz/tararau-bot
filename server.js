const app = require('express')()
const consign = require('consign')
const mongoose = require('mongoose')
require('./config/mongodb')

const port = process.env.PORT

app.mongoose = mongoose

consign()
  .then('./config/middlewares.js')
  .then('./api')
  .then('./config/routers.js')
  .then('./cronJob.js')
  .into(app)

app.listen(port, () => {
  console.log('Backend executando...')
})
