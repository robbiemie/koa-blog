const ErrorRes = require('./../modal/ErrorRes')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }
  res.json(new ErrorRes('未登录'))
}
