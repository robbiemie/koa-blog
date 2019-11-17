const mysql = require('mysql')
const { MYSQL_CONF } = require('./../config/db')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF)

// 开始连接
connection.connect()
// console.log('连接数据库', MYSQL_CONF)

function exec (sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      console.log('操作成功', sql)
      resolve(res)
    })
  })
  return promise
}

module.exports = {
  exec
}
