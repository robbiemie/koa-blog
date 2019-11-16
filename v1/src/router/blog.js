const qs = require("querystring")
const SuccessRes = require("./../modal/SuccessRes")
const ErrorRes = require("./../modal/ErrorRes")
const {getList,getDetailById,create,update,delet} = require("./../controller/blog")


const handleBlogRouter = (req) =>{
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  const query = qs.parse(url.split("?")[1])
  const uid = query.uid
  const id = query.id
  // console.log("query: ",query)
  if(method === 'GET') {
    if(path === '/api/blog/list') {
      // 获取博客列表接口
      const keyword = query.keyword
      let data = getList(uid,keyword)
      return new SuccessRes(data)
    } else if(path === '/api/blog/detail') {
      // 获取博客详情接口
      let data = getDetailById(id)
      return new SuccessRes(data)
    }
  } else if(method === 'POST') {
    if(path === '/api/blog/create') {
      // 发布博客接口
      let data= create(req.body)
      return new SuccessRes(data)
    }  else if(path === '/api/blog/update') {
      // 更新博客接口
      let data= update(id,req.body)
      if(data) {
        return new SuccessRes(data)
      } else {
        return new ErrorRes(null, 'error')
      }
    }  else if(path === '/api/blog/delete') {
      // 删除博客接口
      let data= delet(id)
      if(data) {
        return new SuccessRes()
      } else {
        return new ErrorRes(null, 'error')
      }
    }
  }
}

module.exports = handleBlogRouter