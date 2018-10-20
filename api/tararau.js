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

  const save = (req, res) => {
    const tararau = new Tararau({ ...req.body })

    console.log('POST request', tararau)

    tararau
      .save()
      .then(() => res.status(204).send())
      .catch(err => res.status(500).send(err))
  }

  const get = (req, res) => {
    const params = { ...req.params }

    console.log('GET request', params)

    Tararau.find({ chatId: params.chat })
      .lean()
      .then(tararau => res.json(tararau))
      .catch(err => res.status(500).send(err))
  }

  return { save, get }
}
