class BaseRes {
  constructor(data,message) {
    if(typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if(data) {
      this.data = data
    }
    if(message) {
      this.message = message
    }
  }
}

module.exports = BaseRes