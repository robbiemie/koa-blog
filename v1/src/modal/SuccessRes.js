const BaseRes = require('./BaseRes')
class SuccessRes extends BaseRes {
  constructor (data, message) {
    super(data, message)
    this.code = 0
  }
}

module.exports = SuccessRes
