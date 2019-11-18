const qs = require('querystring')
const SuccessRes = require('./../modal/SuccessRes')
const ErrorRes = require('./../modal/ErrorRes')
const { getList, getDetailById, create, update, del } = require('./../controller/blog')
const { loginCheck } = require('./../common/utils')

const handleBlogRouter = (req) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = qs.parse(url.split('?')[1])
  const nickname = query.nickname
  const id = query.id
  if (method === 'GET') {
    if (path === '/api/blog/list') {
      // 获取博客列表接口
      const keyword = query.keyword
      return getList(nickname, keyword).then(result => {
        return new SuccessRes(result)
      })
    } else if (path === '/api/blog/detail') {
      // 获取博客详情接口
      return getDetailById(id).then(result => {
        return new SuccessRes(result)
      })
    }
  } else if (method === 'POST') {
    if (path === '/api/blog/create') {
      const check = loginCheck(req)
      if (check) return check
      // 发布博客接口
      const body = req.body
      body.nickname = 'robbieyang' // TODO: MOCK
      return create(body).then(result => {
        return new SuccessRes(result)
      })
    } else if (path === '/api/blog/update') {
      const check = loginCheck(req)
      if (check) return check
      // 更新博客接口
      const body = req.body
      body.nickname = 'robbieyang' // TODO: MOCK
      return update(body).then(result => {
        if (result) {
          return new SuccessRes(result)
        } else {
          return new ErrorRes(null, 'error')
        }
      })
    } else if (path === '/api/blog/delete') {
      const check = loginCheck(req)
      if (check) return check
      // 删除博客接口
      const body = req.body
      return del(body).then(result => {
        if (result) {
          return new SuccessRes(result)
        } else {
          return new ErrorRes(null, 'error')
        }
      })
    }
  }
}

module.exports = handleBlogRouter
