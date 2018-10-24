const axios = require('axios')

axios.defaults.baseURL = 'https://tararau-bot.herokuapp.com'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

module.exports = {
  axios
}
