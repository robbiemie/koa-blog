## 技术文档

1. 后台设计方案

- 稳定性 (攻击、服务意外挂掉、进程守候)
- CPU、内存 (`stream`写日志、`redis`存储`session`)
- 日志记录 (监控记录、存储、分析日志)
- 安全性 (越权操作、`DB`攻击、认证校验)
- 集群和服务拆分 (扩展机器、业务服务拆分)


2. 数据存储方案

- 用户存储信息
- 博客存储信息

3. `HTTP` 请求处理

- `GET` 请求 和 `querystring` 获取请求参数

```js
const http = require("http")
const qs = require("querystring")

const server = http.createServer((req,res)=>{
  console.log("methods", res.method)
  res.writeHead(200,{
    'content-type': "text/html"
  })
  const url = req.url
  console.log('url: ', url)
  res.query = qs.parse(url.split('?')[1])
  res.end('<h1>Hello world</h1>')
})

server.listen(3000,_=>{
  console.log('listening on 3000 port!')
})
```

- `POST` 请求 和 `postdata` 

```js
const http = require("http")
const qs = require("querystring")

const server = http.createServer((req,res)=>{
  if(req.method === 'POST') {
    console.log('content-type:', req.headers['content-type'])
    let postData = ''
    req.on('data', chunk =>{
      console.log('chunk: ',chunk.toString('utf8'))
      postData += chunk
    })
    req.on('end', _ =>{
      console.log('postData: ', postData)
      res.end('hello world')
    })
  }
})

server.listen(3000,_=>{
  console.log('listening on 3000 port!')
})
```

- 路由处理

```js
const http = require("http")
const qs = require("querystring")

const server = http.createServer((req,res)=>{
  const url = req.url
  const path = url.split("?")[0]
  console.log('path: ', path)
  res.end(path)
})

server.listen(3000,_=>{
  console.log('listening on 3000 port!')
})
```

- 返回 `JSON` 数据

```js
const http = require("http")
const qs = require("querystring")

const server = http.createServer((req,res)=>{
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  const query = qs.parse(url.split("?")[1])

  res.setHeader("Content-type", "application/json")
  const data = {
    method,
    url,
    path,
    query
  }
  res.end(JSON.stringify(data))
})

server.listen(3000,_=>{
  console.log('listening on 3000 port!')
})
```

- 综合实践

```js
const http = require("http")
const qs = require("querystring")

const server = http.createServer((req,res)=>{
  const method = req.method
  const url = req.url
  const path = url.split("?")[0]
  const query = qs.parse(url.split("?")[1])

  res.setHeader("Content-type", "application/json")
  const data = {
    method,
    url,
    path,
    query
  }
  if(method === 'GET') {
    res.end(JSON.stringify(data))
  } else if(method === 'POST') {
    let postData = ''
    req.on("data", chunk =>{
      postData += chunk
    })
    req.on("end", _ => {
      data.postData = postData
      res.end(JSON.stringify(data))
    })
  }
})

server.listen(3000,_=>{
  console.log('listening on 3000 port!')
})
```



4. 接口设计方案

- 登录 (`api/blog/login`、`post`)
- 发布 (`api/blog/create`、`post`)
- 编辑 (`api/blog/update`、`post`、 `id`)
- 删除 (`api/blog/delete`、`post`、 `id`)
- 条件查询博客 (`api/blog/detail`、`get`、`id`)
- 查询博客列表 (`api/blog/list`、`get`、`nickname | keyword`)

5. `nodejs` 读取文件

- 回调方式，读取文件

```js

const fs = require('fs')
const path = require('path')
function getFileContent (fileName,cb) {
  
  const fullFileName = path.resolve(__dirname,'./v1/src/files',fileName)
  // 读取文件内容
  fs.readFile(fullFileName,(err,data)=>{
    if(err) {
      console.error(err)
      throw err
    }
    cb(JSON.parse(data.toString()))
  })
}

getFileContent('a.json', data=>{
  console.log('data:', data)
  getFileContent(data.next, datab => {
    console.log('datab:', datab)
    getFileContent(datab.next, datac =>{
      console.log("datac:", datac)
    })
  })
})
```

- `Promise` 读取文件

```js

const fs = require('fs')
const path = require('path')

function getFileContent (fileName) {
  const fullFileName = path.resolve(__dirname,'./v1/src/files',fileName)

  // 读取文件内容
  const promise = new Promise((resolve,reject)=>{
    fs.readFile(fullFileName,(err,data)=>{
      if(err) {
        console.error(err)
        reject(err)
      }
      resolve(JSON.parse(data.toString()))
    })
  })
  return promise
}

getFileContent('a.json')
  .then(data=>{
    console.log('a.json: ', data)
    return getFileContent(data.next)
  })
  .then(data=>{
    console.log('b.json: ', data)
    return getFileContent(data.next)
  })
  .then(data=>{
    console.log('c.json: ', data)
  })
```

6. 数据库操作

```sql
-- 显示所有数据库
show databases;
-- 创建数据库
create database <db_name>
-- 显示所有数据表
show tables;
-- 查看表结构
desc <tb_name>;
-- 创建数据表
create table <tb_name> (
  id int unsigned not null primary key; -- 无符号整型、非空、主键  
  username varchar(45) not null; -- 字符串类型、非空
);
-- 新增
insert into <tb_name> (cols1,col2,...) values (val1,val2,...);
-- 示例:
insert into users
-> (username,`password`,createtime)
-> values
-> ('root','123',NOW());
-- 全查询
select * from <tb_name>;
-- 查询
select <col1>,<col2>,... from <tb_name>;
-- 示例:
select username,id from users;
-- 条件查询:
select <col1>,<col2>,... from <tb_name> where <col1=val1>,...
-- 示例:
select username,id from users where username='root'
-- 多条件查询
select <col1>,<col2>,... from <tb_name> where <col1=val1> and <col2=val2>
select <col1>,<col2>,... from <tb_name> where <col1=val1> or <col2=val2>
-- 模糊查询
select <col1>,<col2>,... from <tb_name> where col1 like `%<val1>%`
-- 排序
select <col1>,<col2>,... from <tb_name> where <col1=val1> order by id;
-- 倒序
select <col1>,<col2>,... from <tb_name> where <col1=val1> order by id desc;
-- 新增一列
alter table <tb_name>
-> add column <col3> varchar(45) not null;
-- 修改字段值
update <tb_name> set <col1>=<val_new> where <col2>=<val2>;
-- 修改多个字段值
update <tb_name> set <col1>=<val_new1>,<col2>=<val_new2> where <col2>=<val2>;
-- 示例: 
update users set nickname='栗子🌰' where id=1;
-- 删除
delete from <tb_name> where <col1>=<val1>;
-- 示例:
delete from users where id=3;
```

- `nodejs` 连接数据库

```js
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
const query = 'select `username`,`password` from users;'
connection.query(update,(err,res)=>{
  if(err){
    console.error(err)
    throw err
  }
  console.log('查询成功', res)
})
// 更新
const update = "update users set nickname='超级管理员' where id=1;"
connection.query(update,(err,res)=>{
  if(err){
    console.error(err)
    throw err
  }
  console.log('更新成功', res)
})
// 新增
let username = 'test'
let password = 'test'
let createtime = Date.now()
let nickname = '测试用户'
let values = `'${username}','${password}','${createtime}','${nickname}'`
const create = `insert into users (username,\`password\`,createtime,nickname) values(${values});`
connection.query(create,(err,res)=>{
  if(err){
    console.error(err)
    throw err
  }
  console.log('新增成功', res)
})
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

```

5. 用户登录态

- `cookie`
  1. 发送 `http` 请求，会将请求域中的 `cookie` 带给服务端
  2. 服务度可以修改 `cookie` 返回给浏览器
  3. 限制客户端修改 `cookie`
```js
// nodejs 操作cookie
// 读取cookie
const cookie = req.headers.cookie
// 写入cookie
// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie
res.setHeader('Set-Cookie', `username=${body.username};password=${body.password};Path=/;HttpOnly;Expires=${new Date().toGMTString()}`)
```

- `session`

  1. `session`: 本质是 `nodejs` 进程中的内存块,访问量过大导致内存过大
  2. `session`: 多进程之间内存无法共享

- `redis`
  1. `redis`: 数据存放在内存中,数据存储量小,访问速度快,断电易丢失
```bash
# 启动 redis 服务
$ redis-server
# 启动cli
$ redis-cli
# 常用语法
set <key> <value>
get <key>
del <key>
keys *
```
  2.使用 `nodejs` 连接 `redis`
```js
const redis = require('redis')

// 创建客户端
const client = redis.createClient(6379, '127.0.0.1')

client.on('error', err => {
  console.log('error', err)
})

// 测试
client.set('username', 'rob', redis.print)
client.get('username', (err, val) => {
  if (err) {
    throw err
  }
  console.log('val', val)
  client.quit()
})

```

- `nginx` 反向代理
  1. 静态服务、负载均衡
  2. 反向代理(服务后台、对客户端不可见)
> 客户机发送请求时，不会直接发送到目的主机，而是先被代理服务器接收。通过代理配置，再向目的主机发送请求。  


```bash
# 检测 nginx 配置正确
$ nginx -t
# 启动 nginx
$ nginx
# 重启 nginx
$ nginx -s reload
# 停止 nginx
nginx -s stop
```


```bash

server {
    listen       80; # 端口号
    server_name  localhost; # 接口域名
    add_header Access-Control-Allow-Origin localhost; # 允许跨域
    location / {
      proxy_pass http://localhost:5500; # webServer 反向代理: 5500
    }
    location /api/ {
      proxy_pass http://localhost:3000; # node 反向代理
      proxy_set_header Host $host;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

