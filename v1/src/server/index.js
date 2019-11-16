const http = require("http")
const qs = require("querystring")
const handleBlogRouter = require("./../router/blog")
const handleUserRouter = require("./../router/user")

const server = http.createServer((req,res)=>{
  res.setHeader("Content-type", "application/json")
  let data = {}
  let blogData = handleBlogRouter(req,res)
  let userData = handleUserRouter(req,res)
  if(blogData) {
    data = JSON.stringify(blogData)
    res.end(JSON.stringify(data))
    return
  }
  if(userData) {
    data = JSON.stringify(userData)
    res.end(JSON.stringify(data))
    return
  }
  res.writeHead(404,{"Content-type":"text/plain"})
  res.write("404 Not Found\n")
  res.end()
})

server.listen(3000,_=>{
  console.log('listening on 3000 port!')
})