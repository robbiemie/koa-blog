const BaseRes = require("./BaseRes")
class ErrorRes extends BaseRes {
  constructor(data,message) {
    super(data,message)
    this.code = -1
    if(data.code) {
      this.code = data.code
    }
  }
}

module.exports = ErrorRes