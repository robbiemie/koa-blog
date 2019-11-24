var express = require('express')
var router = express.Router()

/* 二级路由 */
// 博客列表
router.get('/list', function (req, res, next) {
  res.json({
    code: 0,
    data: [1, 2, 3]
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
