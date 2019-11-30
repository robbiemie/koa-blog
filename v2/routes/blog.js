var express = require('express')
const SuccessRes = require('./../modal/SuccessRes')
// const ErrorRes = require('./../modal/ErrorRes')
var router = express.Router()
const { getList, getDetailById, create, update, del } = require('./../controller/blog')

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
  res.json({
    code: 0,
    data: [1, 2, 3]
  })
})

module.exports = router
