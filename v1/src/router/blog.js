const qs = require("querystring")
const SuccessRes = require("./../modal/SuccessRes")
const ErrorRes = require("./../modal/ErrorRes")
const {getList} = require("./../controller/blog")


const handleBlogRouter = (req,res) =>{
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  const query = qs.parse(url.split("?")[1])
  console.log("query: ",query)
  if(method === 'GET') {
    if(path === '/api/blog/list') {
      console.log("query: ",query)
      // 获取博客列表接口
      const uid = query.uid
      const keyword = query.keyword
      let data = getList(uid,keyword)
      return new SuccessRes(data)
    }
  } else if(method === 'POST') {
    if(path === '/api/blog/detail') {
      // 获取博客详情接口
      return {
        msg: "获取博客详情接口"
      }
    }  else if(path === '/api/blog/publish') {
      // 发布博客接口
      return {
        msg: "发布博客接口"
      }
    }  else if(path === '/api/blog/update') {
      // 更新博客接口
      return {
        msg: "更新博客接口"
      }
    }  else if(path === '/api/blog/delete') {
      // 删除博客接口
      return {
        msg: "删除博客接口"
      }
    }
  }
}

module.exports = handleBlogRouter