const ErrorRes = require('./../modal/ErrorRes')

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
    return
  }
  ctx.body = new ErrorRes('未登录')
}
