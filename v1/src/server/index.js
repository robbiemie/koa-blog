const http = require('http')
const handleBlogRouter = require('./../router/blog')
const handleUserRouter = require('./../router/user')
const { getCookieExpire, handlePostData, handleCookie } = require('./../common/utils')
const { access } = require('./../common/logger')
const { get, set } = require('./../redis')
// 处理 session
// const SESSION_DATA = {}

const server = http.createServer(async (req, res) => {
  access(`host: ${req.headers.host}, user-agent: ${req.headers['user-agent']}, referer: ${req.headers.referer}`)
  access(`cookie: ${req.headers.cookie}`)
  // 设置响应头
  res.setHeader('Content-type', 'application/json')
  // 解析 cookie
  const cookie = handleCookie(req.headers.cookie)
  req.cookie = cookie
  // 解析 session
  let uid = req.cookie.uid
  let needSetCookie = false
  if (uid) {
    if (!await get(uid)) {
      await set(uid, {})
    }
  } else {
    // 首次登陆
    needSetCookie = true
    uid = `${Date.now()}_${Math.random()}`
    await set(uid, {})
  }
  req.session = await get(uid)
  // 处理 POST 请求体
  handlePostData(req).then(postData => {
    req.body = JSON.parse(postData)
    const blogResult = handleBlogRouter(req, res)
    let data = {}
    if (blogResult) {
      return blogResult.then(result => {
        // 写入 cookie
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `uid=${uid};Path=/;HttpOnly;Expires=${getCookieExpire()}`)
        }
        data = JSON.stringify(result)
        res.end(data)
      })
    }
    const userData = handleUserRouter(req, res)
    if (userData) {
      return userData.then(result => {
        // 写入 cookie
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `uid=${uid};Path=/;HttpOnly;Expires=${getCookieExpire()}`)
        }
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
