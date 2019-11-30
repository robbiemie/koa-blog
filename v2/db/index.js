const mysql = require('mysql')
const { MYSQL_CONF } = require('./../config/db')
// const { runtime, error } = require('./../common/logger')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF)

// 开始连接
connection.connect()
// console.log('连接数据库', MYSQL_CONF)

function exec (sql) {
  // console.log('执行命令: ', sql)
  // runtime(`执行命令: ${sql}`)
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        // error(`SQL ERROR: ${err}`)
        resolve({
          code: -104,
          msg: 'sql 语法错误',
          error: err
        })
      }
      // console.log('查询结果: ', res)
      resolve(res)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}
