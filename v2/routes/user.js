var express = require('express')
const SuccessRes = require('./../modal/SuccessRes')
const ErrorRes = require('./../modal/ErrorRes')
const { login } = require('./../controller/user')
// const { loginCheck } = require('./../common/utils')
var router = express.Router()

/* 二级路由 */
router.post('/login', function (req, res, next) {
  // 登录操作
  const body = req.body
  return login(body).then(async result => {
    if (result.code === 0) {
      // 写入 session
      req.session.username = result.data.username
      req.session.nickname = result.data.nickname
      res.json(new SuccessRes(result))
      next()
    } else {
      res.json(new ErrorRes(result))
      next()
    }
  })
})
// router.get('/login-test', (req, res, next) => {
//   if (req.session.username) {
//     res.json({
//       code: 0,
//       msg: '测试成功'
//     })
//     next()
//     return
//   }
//   res.json({
//     code: -1,
//     msg: '登录失败'
//   })
//   next()
// })

// 统计 PV
// router.get('/session-test', function (req, res, next) {
//   const session = req.session
//   if (!session.viewPage) {
//     session.viewPage = 0
//   }
//   session.viewPage++
//   res.json({ session })
// })

module.exports = router
