const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { authSecret } = require('../.env')

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(params, (payload, done) => ({
    authenticate: () => passport.authenticate()
  }))
}
