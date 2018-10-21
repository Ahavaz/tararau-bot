module.exports = app => {
  const Role = app.mongoose.model('Role', {
    chatId: { type: Number, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true }
  })

  const save = (req, res) => {
    const role = new Role({ ...req.body })

    console.log('POST request', role)
    return role.chatId && role.title
      ? role
          .save()
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send(err))
      : Role.deleteOne({ date: role.date, location: role.location })
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send(err))
  }

  const get = (req, res) => {
    const params = { ...req.params }

    console.log('GET request', params)

    Role.find({ chatId: params.chat })
      .lean()
      .then(role => res.json(role))
      .catch(err => res.status(500).send(err))
  }

  return { save, get }
}
