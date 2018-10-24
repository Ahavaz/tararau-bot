module.exports = app => {
  const Tararau = app.mongoose.model('Tararau', {
    chatId: { type: Number, required: true },
    userId: { type: Number, required: true },
    userName: { type: String, required: true },
    userFullName: { type: String, required: true },
    signName: { type: String, required: true },
    signSymbol: { type: String, required: true },
    birthdate: { type: Date, required: true }
  })

  const get = (req, res) => {
    const params = { ...req.params }
    const today = new Date()
    const month = today.getMonth()
    const day = today.getDate()

    console.log('GET request', params)

    Tararau.aggregate([
      {
        $project: {
          month: { $month: '$birthdate' },
          day: { $dayOfMonth: '$birthdate' }
        }
      },
      {
        $match: {
          month: { month },
          day: { day }
        }
      }
    ])
      .lean()
      .then(tararau => res.status(200).json(tararau))
      .catch(err => res.status(500).send(err))
  }

  return { get }
}
