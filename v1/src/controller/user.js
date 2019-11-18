const { exec } = require('./../db')
const login = ({ username, password }) => {
  const sql = `select username,nickname from users where username='${username}' and password='${password}'`
  return exec(sql).then(result => {
    return {
      code: result[0] ? 0 : -103,
      data: result[0],
      msg: result[0] ? '登录成功' : '账号密码错误'
    }
  })
}
module.exports = {
  login
}
