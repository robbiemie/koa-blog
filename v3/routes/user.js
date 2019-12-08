const router = require('koa-router')()

router.prefix('/api/user')

router.get('/session-test', async function (ctx, next) {
  if (!ctx.session.viewCount) ctx.session.viewCount = 0
  ctx.session.viewCount++
  ctx.body = {
    code: 0,
    count: ctx.session.viewCount
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
