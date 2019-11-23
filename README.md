# koa-blog

> 使用 `koa2` 搭建基础博客系统。

## 启动项目


```bash
# 1.下载依赖包
$ npm install
# 2.使用 npm 启动服务 
$ npm run server
# 或者 使用 yarn 启动
$ yarn server
```

```bash
# 配置nginx.conf
server {
    listen       80; # 端口号
    server_name  localhost; # 接口域名
    add_header Access-Control-Allow-Origin localhost;
    location / {
      proxy_pass http://localhost:5501;
    }
    location /api/ {
      proxy_pass http://localhost:3000;
      proxy_set_header Host $host;
    }
}
```

```bash
# 启动 webServer

# 访问首页
http://localhost/v1/webapp/index.html
```

请求地址

- 登录:  http://localhost:3000/api/blog/login
- 发布: http://localhost:3000/api/blog/create
- 编辑: http://localhost:3000/api/blog/update
- 删除: http://localhost:3000/api/blog/delete
- 条件查询博客: http://localhost:3000/api/blog/detail?id=1
- 查询博客列表:  http://localhost:3000/api/blog/list?username=test&keyword=博客

## 项目结构

1. 需求

- 登录、注册
- 首页、主页、详情
- 新建、编辑

2. 技术栈

- 后台: `koa2`、`nodejs`
- 数据库: `mysql`

3. 开发环境

- `nodemon` 检测文件变化，重启 `node` 服务
- `cross-env` 设置环境变量，兼容 `mac`、`windows` 和 `linux`

## 文档整理

1. [后台设计方案](https://github.com/yang657850144/koa-blog/blob/master/TECH-DOC.md)

2. [数据存储方案](https://github.com/yang657850144/koa-blog/blob/master/TECH-DOC.md)

3. [HTTP请求处理](https://github.com/yang657850144/koa-blog/blob/master/TECH-DOC.md)

4. [接口设计方案](https://github.com/yang657850144/koa-blog/blob/master/TECH-DOC.md)

5. [用户登录态](https://github.com/yang657850144/koa-blog/blob/master/TECH-DOC.md)