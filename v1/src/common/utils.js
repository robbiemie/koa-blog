
const ErrorRes = require('./../modal/ErrorRes')
const getCookieExpire = () => {
  const d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  return d.toGMTString()
}
// 登录校验
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorRes({ msg: '未登录' }))
  }
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
module.exports = {
  getCookieExpire,
  loginCheck,
  handleCookie,
  handlePostData
}
