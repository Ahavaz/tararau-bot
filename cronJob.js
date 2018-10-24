const schedule = require('node-schedule')
const axios = require('axios')
const { baseApiUrl } = require('./global')

// Call base url every 10min from 6am to 11:50pm to prevent app from sleeping in heroku
schedule.scheduleJob('*/10 6-23 * * *', async () => {
  await axios.get(`${baseApiUrl}`).then(() => console.log(`Call base url`))
})

// Check for bdays every day at 8am to notify users and groups
schedule.scheduleJob('*/10 * * * * *', async () => {
  await axios.get(`${baseApiUrl}`).then(() => console.log(`Get all tararaus`))

  // const { data } = await axios.get(`${baseApiUrl}/tararaus/${chatId}`)
  const { data } = await axios.get(`${baseApiUrl}/tararaus`)
  const tararaus = data
  console.log(tararaus)
})
