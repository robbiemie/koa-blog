class BaseRes {
  constructor (data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      if (data.msg) {
        this.message = data.msg
      }
    }
    if (message) {
      this.message = message
    }
  }
}

module.exports = BaseRes
