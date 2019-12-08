var express = require('express')
const SuccessRes = require('./../modal/SuccessRes')
const ErrorRes = require('./../modal/ErrorRes')
var router = express.Router()
const { getList, getDetailById, create, update, del } = require('./../controller/blog')
const loginCheck = require('./../middleware/loginCheck')

/* 二级路由 */
// 博客列表
router.get('/list', function (req, res, next) {
  // 获取博客列表接口
  const nickname = req.query.nickname || ''
  const keyword = req.query.keyword || ''
  return getList(nickname, keyword).then(result => {
    res.json(new SuccessRes(result)) // 此处不使用 return 返回数据
  })
})
// 博客详情
router.get('/detail', function (req, res, next) {
  // 获取博客详情接口
  return getDetailById(req.query.id).then(result => {
    res.json(new SuccessRes(result))
  })
})
// 博客新建
router.post('/create', loginCheck, function (req, res, next) {
  // 发布博客接口
  const body = req.body
  body.nickname = req.session.nickname
  return create(body).then(result => {
    if (result.code === 0) {
      res.json(new SuccessRes(result))
    } else {
      res.json(new ErrorRes(result, '操作失败'))
    }
  })
})
// 博客编辑
router.post('/update', loginCheck, function (req, res, next) {
  // 更新博客接口
  const body = req.body
  body.nickname = req.session.nickname
  return update(body).then(result => {
    if (result.code === 0) {
      res.json(new SuccessRes(result))
    } else {
      res.json(new ErrorRes(result, '操作失败'))
    }
  })
})
// 博客删除
router.post('/delete', loginCheck, function (req, res, next) {
  // 删除博客接口
  const body = req.body
  body.nickname = req.session.nickname
  return del(body).then(result => {
    if (result.code === 0) {
      res.json(new SuccessRes(result))
    } else {
      res.json(new ErrorRes(result, '操作失败'))
    }
  })
})

module.exports = router
