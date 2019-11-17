const mysql = require("mysql")

// 创建连接对象
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "blog"
})

// 开始连接
connection.connect()

// 查询
// const query = 'select `username`,`password` from users;'
// connection.query(update,(err,res)=>{
//   if(err){
//     console.error(err)
//     throw err
//   }
//   console.log('查询成功', res)
// })
// 更新
// const update = "update users set nickname='超级管理员' where id=1;"
// connection.query(update,(err,res)=>{
//   if(err){
//     console.error(err)
//     throw err
//   }
//   console.log('更新成功', res)
// })
// 新增
// let username = 'test'
// let password = 'test'
// let createtime = Date.now()
// let nickname = '测试用户'
// let values = `'${username}','${password}','${createtime}','${nickname}'`
// const create = `insert into users (username,\`password\`,createtime,nickname) values(${values});`
// connection.query(create,(err,res)=>{
//   if(err){
//     console.error(err)
//     throw err
//   }
//   console.log('新增成功', res)
// })
// 删除
const del = "update users set islock=1 where id=4;"
connection.query(del,(err,res)=>{
  if(err){
    console.error(err)
    throw err
  }
  console.log('更新成功', res)
})
// 关闭连接
connection.end()