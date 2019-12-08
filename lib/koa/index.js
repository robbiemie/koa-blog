const http = require('http')

// 组合中间件
function compose (middlewareList) {
  return function (ctx) {
    function dispatch (i) {
      const fn = middlewareList[i]
      try {
        return Promise.resolve( // Promise 装饰
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }
    return dispatch(0)
  }
}

class Koa {
  constructor () {
    this.middlewareList = []
  }
  use (fn) {
    this.middlewareList.push(fn)
    return this
  }
  createContext (req, res) {
    const ctx = {
      req,
      res
    }
    ctx.query = ctx.req.query
    return ctx
  }
  handleRequest (ctx, fn) {
    return fn(ctx)
  }
  callback () {
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, compose)
    }
  }
  listen (...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = Koa
