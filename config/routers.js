module.exports = app => {
  app.get('/', (req, res) => {
    res.send(`Ayn`)
  })

  app
    .route('/roles/:chat')
    .post(app.api.role.save)
    .get(app.api.role.get)

  app.route('/tararaus').get(app.api.tararaus.get)

  app
    .route('/tararaus/:chat')
    .post(app.api.tararau.save)
    .get(app.api.tararau.get)
}
