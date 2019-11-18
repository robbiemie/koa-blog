
const ErrorRes = require('./../modal/ErrorRes')
const getCookieExpire = () => {
  const d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorRes({ msg: '未登录' }))
  }
}
module.exports = {
  getCookieExpire,
  loginCheck
}
