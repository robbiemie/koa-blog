const router = require('koa-router')()
const SuccessRes = require('./../modal/SuccessRes')
const ErrorRes = require('./../modal/ErrorRes')
const { login } = require('./../controller/user')

router.prefix('/api/user')
/* 二级路由 */
router.post('/login', async function (ctx, next) {
  // 登录操作
  const body = ctx.request.body || {}
  const result = await login(body)
  if (result.code === 0) {
    // 写入 session
    ctx.session.username = result.data.username
    ctx.session.nickname = result.data.nickname
    ctx.body = (new SuccessRes(result))
    next()
  } else {
    ctx.body = (new ErrorRes(result))
    next()
  }
})
module.exports = router
