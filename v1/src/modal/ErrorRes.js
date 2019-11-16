const BaseRes = require("./BaseRes")
class ErrorRes extends BaseRes {
  constructor(data,message) {
    super(data,message)
    this.code = -1
  }
}

module.exports = ErrorRes