const redis = require('redis')
const { REDIS_CONF } = require('./../config/db')
const { error } = require('./../common/logger')

// 创建客户端
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('error', err => {
  error(`redis ERROR: ${err}`)
})
// 设置 value
function set (key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  client.set(key, value, redis.print)
}
// 获取 key
function get (key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        reject(err)
        throw err
      }
      if (val === null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
      // 退出
      // client.quit()
    })
  })
}

module.exports = {
  get,
  set
}
