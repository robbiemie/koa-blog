const login = (username,password) => {
  if(username==='root' && password === '123') {
    return {
      code: 0,
      msg: "登录成功"
    }
  }
  return {
    code: -1,
    msg: "登录失败"
  }
}

module.exports = {
  login
}