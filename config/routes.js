module.exports = app => {
  // app.route('/').get((req, res) => res.send(`It's working!`))

  // app
  //   .route('/roles')
  //   .post(app.api.role.save)
  //   .get(app.api.role.get)

  app
    .route('/tararaus/:chat')
    .post(app.api.tararau.save)
    .get(app.api.tararau.get)
}
