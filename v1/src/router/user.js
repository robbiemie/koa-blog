const qs = require("querystring")
const SuccessRes = require("./../modal/SuccessRes")
const ErrorRes = require("./../modal/ErrorRes")
const {login} = require("./../controller/user") 

const  handleUserRouter = (req,res) => {
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  const query = qs.parse(url.split("?")[1])
  console.log('query: ',query)
  if(method === 'POST') {
    if(path === '/api/blog/login') {
      // 登录操作
      let result = login(query.username,query.password)
      if(result.code === 0) {
        console.log('data', result)
        return new SuccessRes(result)
      } else {
        return new ErrorRes(null,'login error')
      }
    }
  }
}
module.exports = handleUserRouter