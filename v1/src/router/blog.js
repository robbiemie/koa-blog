const handleBlogRouter = (req,res) =>{
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  console.log("method: ",method)
  console.log("url: ",url)
  console.log("path: ",path)
  if(method === 'GET') {
    if(path === '/api/blog/list') {
      return {
        msg: "获取博客列表接口"
      }
    } else if(path === '/api/blog/detail') {
      return {
        msg: "获取博客详情接口"
      }
    }  else if(path === '/api/blog/publish') {
      return {
        msg: "发布博客接口"
      }
    }  else if(path === '/api/blog/update') {
      return {
        msg: "更新博客接口"
      }
    }  else if(path === '/api/blog/delete') {
      return {
        msg: "删除博客接口"
      }
    }
  }
}

module.exports = handleBlogRouter