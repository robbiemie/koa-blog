const router = require('koa-router')()
const SuccessRes = require('./../modal/SuccessRes')
const ErrorRes = require('./../modal/ErrorRes')
const { getList, getDetailById, create, update, del } = require('./../controller/blog')
const loginCheck = require('./../middleware/loginCheck')

/* 二级路由 */
router.prefix('/api/blog')
// 博客列表
router.get('/list', async function (ctx, next) {
  // 获取博客列表接口
  const nickname = ctx.request.query.nickname || ''
  const keyword = ctx.request.query.keyword || ''
  const result = await getList(nickname, keyword)
  ctx.body = (new SuccessRes(result)) // 此处不使用 return 返回数据
})
// 博客详情
router.get('/detail', async function (ctx, next) {
  // 获取博客详情接口
  const result = await getDetailById(ctx.request.query.id)
  ctx.body = (new SuccessRes(result))
})
// 博客新建
router.post('/create', loginCheck, async function (ctx, next) {
  // 发布博客接口
  const body = ctx.request.body
  body.nickname = ctx.session.nickname
  const result = await create(body)
  if (result.code === 0) {
    ctx.body = (new SuccessRes(result))
  } else {
    ctx.body = (new ErrorRes(result, '操作失败'))
  }
})
// 博客编辑
router.post('/update', loginCheck, async function (ctx, next) {
  // 更新博客接口
  const body = ctx.request.body
  body.nickname = ctx.session.nickname
  const result = await update(body)
  if (result.code === 0) {
    ctx.body = (new SuccessRes(result))
  } else {
    ctx.body = (new ErrorRes(result, '操作失败'))
  }
})
// 博客删除
router.post('/delete', loginCheck, async function (ctx, next) {
  // 删除博客接口
  const body = ctx.request.body
  body.nickname = ctx.session.nickname
  const result = await del(body)
  if (result.code === 0) {
    ctx.body = (new SuccessRes(result))
  } else {
    ctx.body = (new ErrorRes(result, '操作失败'))
  }
})

module.exports = router
