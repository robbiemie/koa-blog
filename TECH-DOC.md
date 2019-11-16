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
- 查询博客列表 (`api/blog/list`、`get`、`uid | keyword`)

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