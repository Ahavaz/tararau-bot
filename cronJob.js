const schedule = require('node-schedule')
const axios = require('axios')
const { baseApiUrl } = require('./global')

schedule.scheduleJob('*/10 * 6 * * *', async () => {
  await axios.get(`${baseApiUrl}`).then(() => console.log(`Request sent`))
})
