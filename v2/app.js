const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')

const app = express()

// 模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
// 日志
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 解析 cookie
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// 处理 session，必须在 router 处理之前
// 密匙
const SECRET_KEY = 'wJHjco_h8t6'
app.use(session({
  secret: SECRET_KEY,
  cookie: {
    path: '/', // cookie 生效路由
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24小时失效
  }
}))

// 路由注册
app.use('/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

// 处理 404
app.use(function (req, res, next) {
  // 执行 next
  next(createError(404))
})

// 异常处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
