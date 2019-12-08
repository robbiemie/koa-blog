const redis = require('redis')
const { REDIS_CONF } = require('./../config/db')
const { error } = require('./../common/logger')

// 创建客户端
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('error', err => {
  error(`redis ERROR: ${err}`)
})

module.exports = client
