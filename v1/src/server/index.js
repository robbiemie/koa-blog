const http = require('http')
const handleBlogRouter = require('./../router/blog')
const handleUserRouter = require('./../router/user')

// 处理 POST 请求数据
const handlePostData = (req) => {
  const method = req.method
  const promise = new Promise((resolve, reject) => {
    if (method !== 'POST') {
      resolve('{}')
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve('{}')
      return
    }
    let data = ''
    req.on('data', chunk => {
      data += chunk.toString()
    })
    req.on('end', _ => {
      if (!data) {
        resolve('{}')
        return
      }
      resolve(data)
    })
  })

  return promise
}

const handleCookie = (strCookie = '') => {
  return strCookie.split(';').reduce((prev, cur) => {
    const key = cur.split('=')[0].trim()
    const val = (cur.split('=')[1] && (cur.split('=')[1]).trim()) || ''
    prev[key] = val
    return prev
  }, {})
}

const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-type', 'application/json')
  // 解析 cookie
  const cookie = handleCookie(req.headers.cookie)
  req.cookie = cookie
  // 处理 POST 请求体
  handlePostData(req).then(postData => {
    req.body = JSON.parse(postData)
    const blogResult = handleBlogRouter(req, res)
    let data = {}
    if (blogResult) {
      return blogResult.then(result => {
        data = JSON.stringify(result)
        res.end(data)
      })
    }
    const userData = handleUserRouter(req, res)
    if (userData) {
      return userData.then(result => {
        data = JSON.stringify(result)
        res.end(data)
      })
    }
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
})

module.exports = server
