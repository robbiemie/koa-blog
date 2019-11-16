const  handleUserRouter = (req,res) => {
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  if(method === 'POST') {
    if(path === '/api/blog/login') {
      return {
        msg: "用户登录接口"
      }
    }
  }
}
module.exports = handleUserRouter