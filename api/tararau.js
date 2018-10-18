module.exports = app => {
  const Tararau = app.mongoose.model('Tararau', {
    chatId: Number,
    userId: Number,
    userName: String,
    userFullName: String,
    signName: String,
    signSymbol: String,
    birthdate: Date
  })

  const post = (req, res) => {
    Tararau.save().then(tararau => res.json(tararau))
  }

  const get = (req, res) => {
    Tararau.findOne().then(tararau => res.json(tararau))
  }

  return { Tararau, post, get }
}
