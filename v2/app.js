var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')
var blogRouter = require('./routes/blog')

var app = express()

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
// 路由注册
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/blog', blogRouter)

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
