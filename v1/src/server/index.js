const http = require('http')
const handleBlogRouter = require('./../router/blog')
const handleUserRouter = require('./../router/user')
const { getCookieExpire } = require('./../common/utils')

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
// 处理 cookie
const handleCookie = (strCookie = '') => {
  return strCookie.split(';').reduce((prev, cur) => {
    const key = cur.split('=')[0].trim()
    const val = (cur.split('=')[1] && (cur.split('=')[1]).trim()) || ''
    prev[key] = val
    return prev
  }, {})
}

// 处理 session
const SESSION_DATA = {}
function handleSession (req) {
  let uid = req.cookie.uid
  let session = ''
  let needSetCookie = false
  if (uid) {
    if (!SESSION_DATA[uid]) {
      SESSION_DATA[uid] = {}
    }
  } else {
    // 首次登陆
    needSetCookie = true
    uid = `${Date.now()}_${Math.random()}`
    SESSION_DATA[uid] = {}
  }
  session = SESSION_DATA[uid]
  return { ...session, uid, needSetCookie }
}

const server = http.createServer((req, res) => {
  // 设置响应头
  res.setHeader('Content-type', 'application/json')
  // 解析 cookie
  const cookie = handleCookie(req.headers.cookie)
  req.cookie = cookie
  // 解析 session
  const session = handleSession(req)
  req.session = session
  // 处理 POST 请求体
  handlePostData(req).then(postData => {
    req.body = JSON.parse(postData)
    // 写入 cookie
    if (req.session.needSetCookie) {
      res.setHeader('Set-Cookie', `uid=${req.session.uid}1;Path=/;HttpOnly;Expires=${getCookieExpire()}`)
    }
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
