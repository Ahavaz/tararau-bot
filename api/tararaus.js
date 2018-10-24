module.exports = app => {
  const Tararau = app.mongoose.model('Tararau')

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
      }
      // {
      //   $match: {
      //     month: { month },
      //     day: { day }
      //   }
      // }
    ])
      .then(tararau => res.status(200).json(tararau))
      .catch(err => res.status(500).send(err))
  }

  return { get }
}
