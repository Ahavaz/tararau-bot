module.exports = app => {
  app.get('/', (req, res) => {
    console.log(`Received request`)
    res.send(`It works`)
  })

  app
    .route('/roles/:chat')
    .post(app.api.role.save)
    .get(app.api.role.get)

  app
    .route('/tararaus/:chat')
    .post(app.api.tararau.save)
    .get(app.api.tararau.get)
}
