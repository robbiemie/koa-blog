const http = require('http')
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json')
  console.log('request', Date.now())
  if (req.url === '/error') throw new Error('url 错误')
  res.end(JSON.stringify({
    code: 0,
    data: 'pm2 start3'
  }))
})
server.listen(3000)
