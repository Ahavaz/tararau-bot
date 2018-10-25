module.exports = app => {
  const Tararau = app.mongoose.model('Tararau')

  const get = (req, res) => {
    const params = { ...req.params }
    const today = new Date()
    const month = today.getMonth() + 1
    const day = today.getDate()

    console.log('GET request', params)

    Tararau.aggregate([
      {
        $project: {
          userId: 1,
          chatId: 1,
          userName: 1,
          userFullName: 1,
          signName: 1,
          signSymbol: 1,
          birthdate: 1,
          month: { $month: '$birthdate' },
          day: { $dayOfMonth: '$birthdate' }
        }
      },
      {
        $match: {
          month,
          day
        }
      }
    ])
      .then(tararau => res.status(200).json(tararau))
      .catch(err => res.status(500).send(err))
  }

  return { get }
}
