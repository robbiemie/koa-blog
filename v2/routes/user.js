var express = require('express')
var router = express.Router()

/* 二级路由 */
router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  res.json({
    code: 0,
    data: {
      username,
      password
    }
  })
})

router.get('/session-test', function (req, res, next) {
  const session = req.session
  if (!session.viewPage) {
    session.viewPage = 0
  }
  session.viewPage++
  res.json({ session })
})

module.exports = router
