const { exec } = require('./../db')
const login = ({ username, password }) => {
  const sql = `select username,nickname from users where username='${username}' and password='${password}'`
  return exec(sql).then(result => {
    let returnRes = {}
    if (result[0]) {
      returnRes = {
        code: 0,
        data: result[0],
        msg: '登录成功'
      }
    } else {
      returnRes = {
        code: -103,
        msg: '登录失败'
      }
    }
    return returnRes
  })
}
module.exports = {
  login
}
