const BaseRes = require('./BaseRes')
const { error } = require('./../common/logger')
class ErrorRes extends BaseRes {
  constructor (data, message) {
    super(data, message)
    error(`response Error data: ${JSON.stringify(data)}, msg: ${message || ''}`)
    this.code = -1
    if (data.code) {
      this.code = data.code
    }
  }
}

module.exports = ErrorRes
