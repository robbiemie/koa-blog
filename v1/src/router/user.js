const SuccessRes = require('./../modal/SuccessRes')
const ErrorRes = require('./../modal/ErrorRes')
const { login } = require('./../controller/user')
const { loginCheck } = require('./../common/utils')

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  if (method === 'POST') {
    if (path === '/api/blog/login') {
      // 登录操作
      const body = req.body
      return login(body).then(result => {
        if (result.code === 0) {
          // 写入 session
          req.session.username = result.data.username
          req.session.nickname = result.data.nickname
          return new SuccessRes(result)
        } else {
          return new ErrorRes(result)
        }
      })
    }
  }
  if (method === 'GET') {
    if (path === '/api/blog/login-test') {
      // 登录操作
      const check = loginCheck(req)
      if (check) return check
      return Promise.resolve(new SuccessRes({ msg: '登录成功' }))
    }
  }
}
module.exports = handleUserRouter
