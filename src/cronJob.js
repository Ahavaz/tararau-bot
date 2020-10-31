const schedule = require('node-schedule')
const { axios } = require('./config/axios')
const { congratulate } = require('./utils')

// Call base url every 10min from 6am to 11:50pm to prevent app from sleeping in heroku
schedule.scheduleJob('*/10 * * * *', async () => {
  await axios.get().then(() => console.log(`Call base url`))
})

// Check for bdays every day at 8am to notify users and groups
schedule.scheduleJob('0 8 * * *', async () => {
  const { data } = await axios.get(`/tararaus`)
  const tararaus = data
  const chats = tararaus.reduce((array, tararau) => {
    if (!array.includes(tararau.chatId)) array.push(tararau.chatId)
    return array
  }, [])

  chats.forEach(chatId => {
    tararaus.filter(tararau => tararau.chatId === chatId).forEach(tararau => {
      congratulate(tararau)
    })
  })
})
