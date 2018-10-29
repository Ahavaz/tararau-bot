const mongoose = require('mongoose')

const mongoUri = process.env.MONGODB_URI

mongoose
  .connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .catch(() => {
    const msg = `ERROR: Não foi possível se conectar com o MongoDB!`
    console.log(`\x1b[41m%s\x1b[37m`, msg, `\x1b[0m`)
  })
