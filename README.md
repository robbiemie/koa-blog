# koa-blog

## 项目结构

1. 需求

- 登录、注册
- 首页、主页、详情
- 新建、编辑

2. 技术栈

- 后台: `koa2`、`nodejs`
- 数据库: `mysql`


## 文档整理

1. 后台职责

- 稳定性 (攻击、服务意外挂掉、进程守候)
- CPU、内存 (`stream`写日志、`redis`存储`session`)
- 日志记录 (监控记录、存储、分析日志)
- 安全性 (越权操作、`DB`攻击、认证校验)
- 集群和服务拆分 (扩展机器、业务服务拆分)


2. 数据存储方案

- 用户信息
- 博客信息

3. 接口设计方案

- 登录 (`api/blog/login`、`post`)
- 发布 (`api/blog/publish`、`post`)
- 编辑 (`api/blog/update`、`post`)
- 删除 (`api/blog/delete`、`post`)
- 条件查询博客 (`api/blog/detail`、`get`)
- 查询博客列表 (`api/blog/list`、`get`)