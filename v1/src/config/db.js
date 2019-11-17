const env = process.env.NODE_ENV  // 环境变量

// 配置
let MYSQL_CONF

if(env === 'development') {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "blog"
  }
}
if(env === 'production') {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "blog"
  }
}

module.exports = {
  MYSQL_CONF
}
