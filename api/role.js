module.exports = app => {
  const Role = app.mongoose.model('Niver', {
    chatId: Number,
    userId: Number,
    userName: String,
    userFullName: String,
    signName: String,
    signSymbol: String,
    birthdate: Date
  })
  const save = async (req, res) => {
    const role = { ...req.body }
    if (req.params.id) role.id = req.params.id

    try {
      const roleFromDB = await app
        .db('roles')
        .where({ date: role.date })
        .first()
      if (!role.date) console.log(roleFromDB, 'Role já marcado')
    } catch (msg) {
      return res.status(400).send(msg)
    }

    if (role.id) {
      app
        .db('role')
        .update(role)
        .where({ id: role.id })
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } else {
      app
        .db('role')
        .insert(role)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }

    return true
  }

  return { Role, save }
}
