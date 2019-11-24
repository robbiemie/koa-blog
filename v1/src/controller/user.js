const { exec, escape } = require('./../db')
const login = ({ username, password }) => {
  // 转义
  const u = escape(username)
  const p = escape(password)
  const sql = `select username,nickname from users where username=${u} and password=${p}` // sql 注入漏洞
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
