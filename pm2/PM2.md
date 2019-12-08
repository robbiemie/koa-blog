# PM2

- 进程守护，系统崩溃自动重启
- 启动多进程，充分利用 CPU 和 内存
- 配置、自动日志记录功能
- 服务器运维

## 安装

```bash
$ npm i pm2 -g
```

## 常用命令

```bash
# pm2进程列表
$ pm2 list
# 启动
$ pm2 start  <projectName>
# 重启
$ pm2 restart <projectName>/<id>
# 停止
$ pm2 stop <projectName>/<id>
# 删除
$ pm2 delete <projectName>/<id>
# 配置信息
$ pm2 info <projectName>/<id>
# 配置日志
$ pm2 log <projectName>/<id>
# 监控
$ pm2 monit
```

## 进程守护

遇到查询错误崩溃，`pm2` 会使进程重启.

## 常用配置

- 进程数量，日志文件目录
- 修改启动、重启指令
- 访问 server, 检查日志文件内容

```json
{
  "apps": {
    "name": "pm2-app-server",
    "script": "index.js",
    "watch": true, // 文件监听
    "ignore_watch": [
      "node_modules",
      "logs"
    ],
    "instances": 4,
    "error_file": "logs/error.log",
    "out_file": "logs/out.log", // 自定义日志路径
    "log_date_format": "YYYY-MM-DD HH:mm:ss"
  }
}
```

## 多进程

- 多进程和redis

```json
{
  "apps": {
    "name": "pm2-app-server",
    "script": "index.js",
    "watch": true, // 文件监听
    "ignore_watch": [
      "node_modules",
      "logs"
    ],
    "instances": 4, // 进程数
    "error_file": "logs/error.log",
    "out_file": "logs/out.log", // 自定义日志路径
    "log_date_format": "YYYY-MM-DD HH:mm:ss"
  }
}
```