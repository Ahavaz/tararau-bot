module.exports = app => {
  app
    .route('/roles')
    .post(app.api.role.save)
    .get(app.api.role.get)

  app
    .route('/tararaus')
    .post(app.api.tararau.save)
    .get(app.api.tararau.get)
}
